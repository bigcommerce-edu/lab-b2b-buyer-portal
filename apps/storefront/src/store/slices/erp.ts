import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storageSession from 'redux-persist/lib/storage/session';

// TODO: Create the `ERPState` interface
//  - Should have a single property called `erpToken` that is a string

// TODO: Create `initialState` with an empty token value

// TODO: Use `createSlice` to create the `erp` slice
//  - Use the name `erp`
//  - Use the `initialState` value
//  - `reducers` should have a single reducer function called `setErpToken`
//  - `selectors` should have a single selector function called `selectErpToken`

// TODO: Export the `setErpToken` action using the `actions` property of the slice

// TODO: Export the `selectErpToken` selector using the `selectors` property of the slice

// TODO: Use `persistReducer` to persist the `erp` slice with session storage
//  - Export the result as the default export
