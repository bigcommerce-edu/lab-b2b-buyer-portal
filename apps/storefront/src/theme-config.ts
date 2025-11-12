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
      secondary: {
        main: '#f2a579',
      },
    },
    typography: {
      fontFamily: 'Montserrat, Arial, sans-serif',
      body1: {
        fontSize: '1.25rem',
      },
      body2: {
        fontSize: '1rem',
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
      },
      button: {
        fontSize: '1rem',
      },
    },
    // TODO: Add component-specific theme directives
    //  - MuiAccordion: Override the background color style to use the primary light color
    //  - MuiButton: Override the default props to use the 'contained' variant and add a margin of 5px
    //  - MuiIconButton: Override the color style to use the primary main color
  } as ThemeOptions;
}
