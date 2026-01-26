import { combineReducers } from '@reduxjs/toolkit';

import b2bFeatures from './slices/b2bFeatures';
import company from './slices/company';
import global from './slices/global';
import lang from './slices/lang';
import quoteInfo from './slices/quoteInfo';
import storeConfigs from './slices/storeConfigs';
import storeInfo from './slices/storeInfo';
import theme from './slices/theme';
import erp from './slices/erp';

export const reducer = combineReducers({
  global,
  lang,
  company,
  storeConfigs,
  theme,
  b2bFeatures,
  quoteInfo,
  storeInfo,
  erp,
});
