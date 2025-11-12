import { Theme, ThemeOptions } from "@mui/material"

export const getThemeConfig = (theme: Theme) => {
  return {
    typography: {
      fontFamily: 'Montserrat, Arial, sans-serif',
    },
  } as ThemeOptions;
}
