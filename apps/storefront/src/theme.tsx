import { ReactNode, useContext } from 'react';
import * as materialMultiLanguages from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { CustomStyleContext } from './shared/customStyleButton';
import { BROWSER_LANG } from './constants';

type LangMapType = {
  [index: string]: string;
};

const MUI_LANG_MAP: LangMapType = {
  en: 'enUS',
  zh: 'zhCN',
  fr: 'frFR',
  nl: 'nlNL',
  de: 'deDE',
  it: 'itIT',
  es: 'esES',
};

type MaterialMultiLanguagesType = {
  [K: string]: materialMultiLanguages.Localization;
};

type Props = {
  children?: ReactNode;
};

function B3ThemeProvider({ children }: Props) {
  const {
    state: {
      portalStyle: { backgroundColor = '', primaryColor = '' },
    },
  } = useContext(CustomStyleContext);

  // TODO: Apply custom theme config on top of this base config
  //  - Convert this from a short-hand return to a full function
  //  - Capture the first results of `createTheme` in a variable
  //  - Pass the first theme object to `getThemeConfig` and pass this to a second `createTheme` call
  //  - Return the final theme object
  const theme = (lang: string) =>
    createTheme(
      {
        palette: {
          background: {
            default: backgroundColor,
          },
          primary: {
            main: primaryColor || '#1976d2',
          },
        },
      },
      (materialMultiLanguages as MaterialMultiLanguagesType)[MUI_LANG_MAP[lang] || 'enUS'],
    );

  return <ThemeProvider theme={theme(BROWSER_LANG)}>{children}</ThemeProvider>;
}

export default B3ThemeProvider;
