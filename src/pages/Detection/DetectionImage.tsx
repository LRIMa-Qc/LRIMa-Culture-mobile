import { Annotation, ImageAnnotationPopup, ImageAnnotator, PopupProps, useAnnotator } from "@annotorious/react";
import { useEffect } from "react";

export interface IDetectionImage {
    src: string;
}

export function DetectionImage({src}: IDetectionImage) {
    const anno = useAnnotator();

    useEffect(() => {
        anno?.on('createAnnotation', (a) => {
            const annotation = a as Annotation;
            console.log(a);
            anno?.setAnnotations([annotation], true);
            // console.log('User created annotation: ', (annotation as Annotation).target.selector.geometry);
          });
    }, [anno]); 

    return (
        <div className="">
            <ImageAnnotator
            
                containerClassName=""
            >
                <img className="rounded-xl ring-1 ring-zinc-400" src={src} alt="hmmm, not showing..."/>
            </ImageAnnotator>
            <ImageAnnotationPopup
                popup={(props: PopupProps) => (
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
        </div>

    )
}