import { useContext, useState } from "react";
import { AppBar } from "../../components/appbar/AppBar";

import { Camera, CameraResultType } from '@capacitor/camera';
import { Widget } from "../../components/dashboard/widget/Widget";
import { useTranslation } from "react-i18next";

import { Annotorious } from '@annotorious/react';
import '@annotorious/react/annotorious-react.css';
import { DetectionImage } from "./DetectionImage";
import { ApiContext } from "@alivecode/core/api";

export default function Detection() {
    const {t} = useTranslation();

    const [imageSrc, setImageSrc] = useState("");
    const [pred, setPred] = useState(null);

    const {axios} = useContext(ApiContext);

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
                const file = new File([blob], "my-image", { type: 'image/png' });

		console.log(blob);

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
		    }	
		    
                );

		console.log("data:", data);

		const pred = (await data.data)[0];

		console.log("Setting Pred...")
		setPred(pred);
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
                        <Annotorious>
                            <DetectionImage src={imageSrc} pred={pred} />
                          </Annotorious>
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
