import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storageSession from 'redux-persist/lib/storage/session';

export interface CRMState {
  crmToken: string;
}

const initialState: CRMState = {
  crmToken: '',
};

const crmSlice = createSlice({
  name: 'crm',
  initialState,
  reducers: {
    setCrmToken: (state, { payload }: PayloadAction<string>) => {
      state.crmToken = payload;
    },
  },
  selectors: {
    selectCrmToken: (state) => state.crmToken,
  },
});

export const {
  setCrmToken,
} = crmSlice.actions;

export const {
  selectCrmToken,
} = crmSlice.selectors;

export default persistReducer({ key: 'crm', storage: storageSession }, crmSlice.reducer);
