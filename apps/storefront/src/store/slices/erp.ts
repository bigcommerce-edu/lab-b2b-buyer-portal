import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storageSession from 'redux-persist/lib/storage/session';

export interface ERPState {
  erpToken: string;
}

const initialState: ERPState = {
  erpToken: '',
};

const erpSlice = createSlice({
  name: 'erp',
  initialState,
  reducers: {
    setErpToken: (state, { payload }: PayloadAction<string>) => {
      state.erpToken = payload;
    },
  },
  selectors: {
    selectErpToken: (state) => state.erpToken,
  },
});

export const {
  setErpToken,
} = erpSlice.actions;

export const {
  selectErpToken,
} = erpSlice.selectors;

export default persistReducer({ key: 'erp', storage: storageSession }, erpSlice.reducer);
