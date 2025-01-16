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

import Compressor from 'compressorjs';
import { toast } from "react-toastify";

export default function Detection() {
    const {t} = useTranslation();

    const [imageSrc, setImageSrc] = useState("");
    const [pred, setPred] = useState(null);

    const {axios} = useContext(ApiContext);


    const {serreId} = useSerreStore();
    
        const generateCombinedImageFile = async (
            imageFile: File,
            positions: [number, number, number, number],
            label: number,
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
    

    // TODO: Added required Info.plist elements for iPhones (see docs)
    const takePicture = async () => {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Base64
        });
      
        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        const imageUrl = "data:image/png;base64," + image.base64String;
	    console.log(imageUrl);

        fetch(imageUrl)
            .then(res => res.blob())
            .then(async (blob) => {
                let file = new File([blob], "my-image", { type: 'image/png' });

                new Compressor(file, {
                    quality: 0.8,
                
                    // The compression process is asynchronous,
                    // which means you have to access the `result` in the `success` hook function.
                    async success(result) {
                        file = result as File;
                            console.log(file);

                            const formData = new FormData();
                            formData.append('image', file);
            
                            console.log("formData", formData.get("image"));
            
                            const data = await axios.post(
                                'diseases/prediction', 
                            formData, {
                            headers: {
                                    "Content-Type": "multipart/form-data",
                            },
                            data: formData, // Use the data option to specify the request body
                        });
                            
            
                    console.log("data:", data);

                    const pred = (await data.data)[0];

		    if (!pred) {
			    toast.success(t('iot.project.camera.noDetection'))
			    return;
		    }
            
                    const imageFusion = await generateCombinedImageFile(
                        file,
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
                        }	
                    );
            
                    console.log("Setting Pred...")
                    setPred(pred);
                                            
                    },
                    error(err) {
                      console.log(err.message);
                    },
                  });
        })
      
        // Can be set to the src of an image now

        		setImageSrc(imageUrl || "");
      };


    return (
        <div className="space-y-5">
            <AppBar label={t('iot.project.camera.name')} />
            <div className="mx-5">
                <Widget label={t('iot.project.camera.name')}>
                    <div className="w-full flex justify-center flex-col gap-5 py-2">
                        {imageSrc ?
                        (
					pred ? (
	
                        <Annotorious>
                            <DetectionImage src={imageSrc} pred={pred} />
                          </Annotorious>

				
					) : <p>{t('msg.loading')}</p>
                        ) :
                        <p className="text-center">{t('iot.project.camera.takePictureInstruction')}</p>    
                        } 
                        <button
                            onClick={takePicture}
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
