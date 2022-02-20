import { DefaultTheme } from "@react-navigation/native";

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    SUCCESS: "#08A652",
    CRITICAL: "#CC0001",
    ERROR: "#F6650A",
    GREY: "#808080",
    GREEN: "#82ff65",
    SNOW: "#fffafa",
    BLACK: "#000",
    WHITE: "#fff",
  },
};
