import { ThemeContext, useTheme } from "@alivecode/ui"
import { myThemes } from "../theme"
import { FunctionComponent, useMemo } from "react";
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

    return (
        <ThemeContext.Provider value={themeProviderValues}>
            <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
                <App />
            </div> 
        </ThemeContext.Provider>
    )
}