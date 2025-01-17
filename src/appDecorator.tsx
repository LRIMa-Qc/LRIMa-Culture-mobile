import { ThemeContext, useTheme } from "@alivecode/ui";
import { myThemes } from "./theme";
import { useMemo } from "react";

export const AppDecorator = ({App}: any) => {

    const {themes, setTheme, theme} = useTheme(myThemes);

    const themeProviderValues = useMemo(
      () => ({
          theme,
          setTheme,
          themes,
      }),
      [theme, setTheme],
  );

  
    return (
      <ThemeContext.Provider value={themeProviderValues}>
        <App/>
      </ThemeContext.Provider>
    )
  }