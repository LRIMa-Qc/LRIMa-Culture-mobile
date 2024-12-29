import { ThemeContext, useTheme } from "@alivecode/ui"
import { myThemes } from "../theme"
import { FunctionComponent, useMemo } from "react";

export const AppDecorator = ({ App }: { App: FunctionComponent }) => {
    const { themes, setTheme, theme } = useTheme(myThemes);

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
            <App />
        </ThemeContext.Provider>
    )
}