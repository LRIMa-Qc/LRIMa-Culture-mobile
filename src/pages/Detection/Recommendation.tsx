import { Annotation, ImageAnnotationPopup, ImageAnnotator, PopupProps, useAnnotator } from "@annotorious/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface IRecommendation { }
export interface RecommendationData {
  content: string;
}

export function Recommendation({ }: IRecommendation) {
  const [recommendationData, setRecommendationData] = useState<null | RecommendationData>(false);
  const { t } = useTranslation();

  const handleClick = async () => {
    const raw = await fetch('https://lorem-api.com/api/lorem')
      .then(response => response.text());

    setRecommendationData({
      content: raw,
    })
  }

  return (
    <div className="">
      {recommendationData ? (
        <p className="bg-emerald-50 border border-emerald-400 rounded-xl p-3">{recommendationData.content}</p>
      ) : (
        <button className="p-3 w-full bg-emerald-200 rounded-xl" onClick={handleClick}>{t('iot.project.camera.getRecommendation')}</button>
      )}
    </div>
  )
}
