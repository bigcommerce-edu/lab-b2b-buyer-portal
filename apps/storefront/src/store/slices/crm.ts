import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storageSession from 'redux-persist/lib/storage/session';

// TODO: Create the `CRMState` interface
//  - Should have a single property called `crmToken` that is a string

// TODO: Create `initialState` with an empty token value

// TODO: Use `createSlice` to create the `crm` slice
//  - Use the name `crm`
//  - Use the `initialState` value
//  - `reducers` should have a single reducer function called `setCrmToken`
//  - `selectors` should have a single selector function called `selectCrmToken`

// TODO: Export the `setCrmToken` action using the `actions` property of the slice

// TODO: Export the `selectCrmToken` selector using the `selectors` property of the slice

// TODO: Use `persistReducer` to persist the `erp` slice with session storage
//  - Export the result as the default export
