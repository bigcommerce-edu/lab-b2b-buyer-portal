import { Theme, ThemeOptions } from "@mui/material"

export const getThemeConfig = (theme: Theme) => {
  return {
    palette: {
      background: {
        default: theme.palette.background.default,
      },
      primary: {
        main: theme.palette.primary.main,
      },
    },
    typography: {
      fontFamily: 'Montserrat, Arial, sans-serif',
    },
  } as ThemeOptions;
}
