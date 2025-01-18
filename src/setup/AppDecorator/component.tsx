import { ThemeContext, useTheme } from "@alivecode/ui"
import { myThemes } from "../theme"
import { FunctionComponent, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export const AppDecorator = ({ App }: { App: FunctionComponent }) => {
    const { themes, setTheme, theme } = useTheme(myThemes);
    const {i18n} = useTranslation();

    const themeProviderValues = useMemo(
        () => ({
            theme,
            setTheme,
            themes
        }),
        [theme, themes, setTheme]
    );

    useEffect(() => {
        document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
        document.body.lang = i18n.language
    }, [i18n.language])

    return (
        <ThemeContext.Provider value={themeProviderValues}>
            <div dir={i18n.language === "ar" ? "rtl" : "ltr"} lang={i18n.language}>
                <App />
            </div> 
        </ThemeContext.Provider>
    )
}