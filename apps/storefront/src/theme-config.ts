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
      // TODO: Set the secondary color
    },
    typography: {
      fontFamily: 'Montserrat, Arial, sans-serif',

      // TODO: Apply other typography config
      //  - Apply a different font size for body text, h3 headings, and buttons
    },
  } as ThemeOptions;
}
