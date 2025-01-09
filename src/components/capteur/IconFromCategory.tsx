import { TbApple as AppleIcon } from "react-icons/tb";

import { TbCarrot as CarrotIcon } from "react-icons/tb";

import { TbSalad as LettuceIcon } from "react-icons/tb";

import { CiFries as PotatoIcon } from "react-icons/ci";

import { GiStrawberry as StrawberryIcon } from "react-icons/gi";

import { GiTomato as TomatoIcon } from "react-icons/gi";  

export enum CULTURE_TYPE {
	APPLE = 'apple',
	CARROT = 'carrot',
	LETTUCE = 'lettuce',
	POTATO = 'potato',
	STRAWBERRY = 'strawberry',
	TOMATO = 'tomato',
}

export function IconFromCateogry(category: CULTURE_TYPE) {
    switch (category) {
        case CULTURE_TYPE.APPLE:
            return AppleIcon;
        case CULTURE_TYPE.CARROT:
            return CarrotIcon;
        case CULTURE_TYPE.LETTUCE:
            return LettuceIcon;
        case CULTURE_TYPE.POTATO:
            return PotatoIcon;
        case CULTURE_TYPE.STRAWBERRY:
            return StrawberryIcon;
        case CULTURE_TYPE.TOMATO:
            return TomatoIcon;
    }
}