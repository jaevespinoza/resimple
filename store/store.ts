import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "../src/actions/AppReducer";

/**
 * Application's store that has the reducers and the states
 * of the application's modules.
 */
export const store = configureStore({
  reducer: {
    app: AppReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
