import { Annotation, ImageAnnotationPopup, ImageAnnotator, PopupProps, useAnnotator } from "@annotorious/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Picture, Prediction } from "./Detection";
import { Recommendation } from "./Recommendation";

export interface IDetectionImage {
    picture: Picture;
    pred: Prediction;
}

export function DetectionImage({ picture, pred }: IDetectionImage) {
    const anno = useAnnotator();

    const [drawingEnabled, setDrawingEnabled] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        anno?.on('createAnnotation', (a) => {
            const annotation = a as Annotation;
            anno?.setAnnotations([annotation], true);
        });

        const [x, y, w, h] = pred.box;

        const annot = {
            id: '7fb76422-3a8c-4c87-bbad-7c8bb68399a0',
            target: {
                selector: {
                    type: 'RECTANGLE',
                    geometry: {
                        bounds: {
                            // Je crois qu'ils ne font rien :d
                            minX: 0,
                            minY: 0,
                            maxX: 0,
                            maxY: 0
                        },
                        x: x,
                        y: y,
                        w: w - x,
                        h: h - y,
                    }
                }
            }
        }
        anno?.setAnnotations([annot], true);
    }, [pred, anno, picture]);

    return (
        <div className="">
            <ImageAnnotator
                drawingEnabled={drawingEnabled}
                containerClassName=""
            >
                <img className="rounded-xl ring-1 ring-zinc-400" src={picture.image.src} alt="hmmm, not showing..." />
            </ImageAnnotator>
            {pred && (
                <div className="space-y-2">
                    <p>Maladie: <span className="underline">{pred?.label}</span></p>
                    <button onClick={() => setDrawingEnabled(true)} className="p-3 w-full bg-emerald-200 rounded-xl">Mauvaise Maladie? Contribuer</button>
                    <Recommendation />
                </div>
            )}

        </div>
    )
}
