import { Annotation, ImageAnnotationPopup, ImageAnnotator, PopupProps, useAnnotator } from "@annotorious/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface IDetectionImage {
    src: string;
    pred: any;
}



export function DetectionImage({src, pred}: IDetectionImage) {
    const anno = useAnnotator();

    const {t} = useTranslation();

    useEffect(() => {
        anno?.on('createAnnotation', (a) => {
            const annotation = a as Annotation;
            console.log(a);
            anno?.setAnnotations([annotation], true);
            // console.log('User created annotation: ', (annotation as Annotation).target.selector.geometry);
          });
	    const annot = {
            id: '7fb76422-3a8c-4c87-bbad-7c8bb68399a0',
            target: {
                selector: {
                type: 'RECTANGLE',
                geometry: {
                    bounds: {
                        minX: pred?.box[0],
                        minY: pred?.box[1],
                        maxX: pred?.box[2],
                        maxY: pred?.box[3]
                    },
                    x: pred?.box[0],
                    y: pred?.box[1],
                    w: pred?.box[2],
                    h: pred?.box[3],
                }
                }
            }
        }
        console.log(annot)
	    anno?.setAnnotations([annot], true);
    }, [pred]); 

    return (
        <div className="">
            <ImageAnnotator
            
                containerClassName=""
            >
                <img className="rounded-xl ring-1 ring-zinc-400" src={src} alt="hmmm, not showing..."/>
            </ImageAnnotator>
            <ImageAnnotationPopup
                popup={(_: PopupProps) => (
                    <div className="grid rounded-xl overflow-hidden">
                        <p className="p-3 text-white bg-emerald-400">
                            Indiquez la bonne maladie
                        </p>
                        <select className="bg-emerald-300 p-3 text-black outline-none">
                            <option>Spiderman</option>
                            <option>Batman</option>
                            <option>Ironman</option>
                        </select>
                    </div>
                )}
            />
	    {
		    pred ? <div>Maladie: {pred?.label}</div> : <></>

	    }
	    	    </div>
    )
}
