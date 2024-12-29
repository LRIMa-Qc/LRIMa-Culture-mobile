import { ALIVEuiThemes, BaseTheme } from "@alivecode/ui";
import { TbMoon, TbSun } from "react-icons/tb";

type ThemeColors<T extends string[]> = { [key in T[number]]: string };

export interface CustomTheme extends BaseTheme {
  name: "light" | "dark";
  color: BaseTheme["color"] &
    ThemeColors<
      [
        "texteditor_text",
        "body",
      ]
    >;
}

const appThemes: CustomTheme[] = [
  {
    name: "light",
    selectMenu: {
      background: "#ffffff",
      icon: TbSun,
    },
    color: {
      // Main colors
      primary_50: "#f0f5ff",
      primary_100: "#d5e3ff",
      primary_200: "#abc8ff",
      primary_300: "#82acff",
      primary_400: "#5891ff",
      primary_500: "#2e75ff",
      primary_600: "#255ecc",
      primary_700: "#1c4699",
      primary_800: "#122f66",
      primary_900: "#091733",

      // TextEditor colors
      texteditor_text: "#343752",

      // Foreground and background colors
      body: "#f9fafb",
      bg: "#ffffff",
      fg: "#1f2937",
      gray_100: "#f4f4f5",
      gray_200: "#e4e4e7",
      gray_300: "#d4d4d8",
      gray_400: "#a1a1aa",
      gray_500: "#71717a",
      gray_600: "#5C5C5C",
      gray_700: "#525252",
      gray_800: "#474747",
      gray_900: "#3D3D3D",

      // Form colors
      success_100: "#dcfce7",
      success_200: "#b9f7c9",
      success_300: "#95f0ab",
      success_400: "#72eba8",
      success_500: "#22c55e",
      success_600: "#1d9e4f",
      success_700: "#177740",
      success_800: "#125031",
      success_900: "#0d2a22",

      error_100: "#f8cfcf",
      error_200: "#f4b5b5",
      error_300: "#f08b8b",
      error_400: "#ec5e5e",
      error_500: "#ef4444",
      error_600: "#dc2626",
      error_700: "#b91c1c",
      error_800: "#991b1b",
      error_900: "#7f1d1d",

      warning_100: "#fff9e0",
      warning_200: "#ffedb3",
      warning_300: "#ffe080",
      warning_400: "#ffd34d",
      warning_500: "#f5b81c",
      warning_600: "#e0a00c",
      warning_700: "#b37a0e",
      warning_800: "#8c5811",
      warning_900: "#6e4513",
      // bg_warning: "#ffedd5",

      // Misc colors
      danger: "#EF4444",
      shadow: "#cccccc",
    },
  },
  {
    name: "dark",
    selectMenu: {
      background: "#222222",
      icon: TbMoon,
    },
    color: {
      // Main colors
      primary_50: "#08142d",
      primary_100: "#102859",
      primary_200: "#193c85",
      primary_300: "#2150b1",
      primary_400: "#2964dd",
      primary_500: "#2e75ff",
      primary_600: "#82acff",
      primary_700: "#abc8ff",
      primary_800: "#d5e3ff",
      primary_900: "#f0f5ff",

      // TextEditor colors
      texteditor_text: "#e4e8ec",

      // Background colors
      body: "#0c0f1d",
      bg: "#020b12",
      fg: "#e4e8ec",
      gray_100: "#1a1a1a",
      gray_200: "#333333",
      gray_300: "#4d4d4d",
      gray_400: "#666666",
      gray_500: "#808080",
      gray_600: "#999999",
      gray_700: "#b3b3b3",
      gray_800: "#cccccc",
      gray_900: "#e6e6e6",

      // Form colors
      success_100: "#052e16",
      success_200: "#0b5c2c",
      success_300: "#118a42",
      success_400: "#16b758",
      success_500: "#22c55e",
      success_600: "#3ebf6b",
      success_700: "#5ab978",
      success_800: "#77b385",
      success_900: "#93ae92",

      error_100: "#450a0a",
      error_200: "#8a1414",
      error_300: "#cf1e1e",
      error_400: "#ff2929",
      error_500: "#ef4444",
      error_600: "#f87171",
      error_700: "#fca5a5",
      error_800: "#fecaca",
      error_900: "#fee2e2",

      warning_100: "#4d3a00",
      warning_200: "#806000",
      warning_300: "#b38600",
      warning_400: "#e6ac00",
      warning_500: "#f5b81c",
      warning_600: "#f7c346",
      warning_700: "#f9ce70",
      warning_800: "#fbd999",
      warning_900: "#fde4c3",

      // Misc colors
      danger: "#EF4444",
      shadow: "#09253f",
    },
  },
];

export const myThemes = new ALIVEuiThemes("light", appThemes);