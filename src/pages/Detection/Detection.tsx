import { useContext, useState } from "react";
import { AppBar } from "../../components/appbar/AppBar";

import { Camera, CameraResultType } from '@capacitor/camera';
import { Widget } from "../../components/dashboard/widget/Widget";
import { useTranslation } from "react-i18next";

import { Annotorious } from '@annotorious/react';
import '@annotorious/react/annotorious-react.css';
import { DetectionImage } from "./DetectionImage";
import { ApiContext } from "@alivecode/core/api";
import { useSerreStore } from "../../stores/serreStore";

const WORKING_CULTURES = ['tomato', 'onion', 'potato'];

export interface Prediction {
    /// x, y, w, h
    box: [number, number, number, number],
    label: string;
}

export interface Picture {
    file: File;
    image: HTMLImageElement;
}

export default function Detection() {
    const { t } = useTranslation();

    const [picture, setPicture] = useState<Picture | undefined | 'no detection'>(undefined);
    const [culture, setCulture] = useState(WORKING_CULTURES[0]);
    const [pred, setPred] = useState<Prediction | null>(null);

    const { axios } = useContext(ApiContext);


    const { serreId } = useSerreStore();

    const generateCombinedImageFile = async (
        imageFile: File,
        positions: [number, number, number, number],
        label: string,
    ): Promise<File | null> => {
        const canvas = document.createElement('canvas');
        const [pos1, pos2, pos3, pos4] = positions;

        // Create an HTMLImageElement from the file
        const imageElement = new Image();
        const imageURL = URL.createObjectURL(imageFile);

        return new Promise<File | null>((resolve, reject) => {
            imageElement.onload = () => {
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    console.error(t('iot.project.camera.canvasFail'));
                    URL.revokeObjectURL(imageURL); // Clean up object URL
                    reject(null);
                    return;
                }

                // Get the natural dimensions of the image
                const naturalWidth = imageElement.naturalWidth;
                const naturalHeight = imageElement.naturalHeight;

                // Set the canvas size to the image's natural dimensions
                canvas.width = naturalWidth;
                canvas.height = naturalHeight;

                // Draw the image onto the canvas
                ctx.drawImage(imageElement, 0, 0);

                // Directly use the provided positions without any scaling
                ctx.beginPath();
                ctx.moveTo(pos1, pos2);
                ctx.lineTo(pos3, pos2);
                ctx.lineTo(pos3, pos4);
                ctx.lineTo(pos1, pos4);
                ctx.closePath();
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.font = '12px Arial';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';
                ctx.fillText(`Label: ${label}`, 10, 30); // Adjust padding (10px from the right, 30px from the top)


                // Convert the canvas to a Blob and then to a File
                canvas.toBlob(blob => {
                    URL.revokeObjectURL(imageURL);
                    if (blob) {
                        const combinedFile = new File([blob], `${new Date().toISOString().split('T')[0]}_${new Date().toTimeString().split(' ')[0].replace(/:/g, '-')}.png`, {
                            type: 'image/png',
                        });
                        resolve(combinedFile);
                    } else {
                        console.error(t('iot.project.camera.canvasFail'));
                        reject(null);
                    }
                }, 'image/png');
            };

            imageElement.onerror = err => {
                console.error(t('iot.project.camera.errorLoading'), err);
                URL.revokeObjectURL(imageURL);
                reject(null);
            };

            // Set the source of the image
            imageElement.src = imageURL;
        });
    };

    const takePicture = async () => {
        const img = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64
        });

        const imageUrl = "data:image/png;base64," + img.base64String;
        const blob = await fetch(imageUrl)
            .then(res => res.blob());

        const file = new File([blob], "my-image", { type: 'image/png' });

        const image = new Image();
        image.src = imageUrl;
        await image.decode();

        return { file, image };
    }

    const getPrediction = async (file: File) => {

        const formData = new FormData();
        formData.append('image', file);

        const data = await axios.post(
            `diseases/prediction/${culture}`,
            formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        });

        const pred = (await data.data)[0] as Prediction;

        return { pred };
    }

    const uploadPrediction = async (img: File, pred: Prediction) => {
        const imageFusion = await generateCombinedImageFile(
            img,
            pred.box,
            pred.label,
        );

        const formDataFinal = new FormData();

        if (imageFusion) {
            formDataFinal.append('file', imageFusion);
        } else {
            console.error(t('iot.project.camera.no_camera'));
            return;
        }

        await axios.post(
            `dataset-bucket/upload/${serreId}/Result`,
            formDataFinal, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formDataFinal, // Use the data option to specify the request body
        });
    }

    // TODO: Added required Info.plist elements for iPhones (see docs)
    const processPictureTaken = async () => {

        setPicture(undefined);
        setPred(null);

        const { file, image } = await takePicture();

        setPicture({ file, image });

        const { pred } = await getPrediction(file);

        if (!pred) {
            setPred(null);
            setPicture('no detection');
            return;
        }

        await uploadPrediction(file, pred);

        setPred(pred);
    };

    return (
        <div className="space-y-5">
            <AppBar label={t('iot.project.camera.name')} />
            <div className="mx-5">
                <Widget label={t('iot.project.camera.name')}>
                    <div className="w-full flex justify-center flex-col gap-5 py-2">
                        {picture === undefined ?
                            <p className="text-center">{t('iot.project.camera.takePictureInstruction')}</p> :
                            picture === 'no detection' ?
                                <p>{t('iot.project.camera.noDetection')}</p> :
                                (
                                    pred ? (
                                        <Annotorious>
                                            <DetectionImage picture={picture} pred={pred} />
                                        </Annotorious>
                                    ) : <p className="animate-pulse">{t('msg.loading')}</p>
                                )
                        }
                        <select defaultValue={culture} onChange={(e) => setCulture(e.currentTarget.value)} className="p-3 rounded-xl outline-none ring-[1px] ring-emerald-400">
                            {WORKING_CULTURES.map(cl =>
                                <option key={cl} value={cl}>{t(`culture.sensor.types.${cl}`)}</option>
                            )}
                        </select>
                        <button
                            onClick={processPictureTaken}
                            className="bg-emerald-400 text-white rounded-xl p-3 hover:underline"
                        >
                            {t('iot.project.camera.takePicture')}
                        </button>
                    </div>
                </Widget>
            </div>
        </div>
    );
}
