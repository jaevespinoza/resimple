import { createSlice } from "@reduxjs/toolkit";
import { AppState, IAggregateEmployee } from "./AppInterfaces";

/**
 * The initial state of the application when booted up.
 */
const initialState: AppState = {
  information: {} as IAggregateEmployee,
  loading: false,
  companies: {},
};

/**
 * Slice that creates the reducer, actions and functions
 * required for the application state to work.
 */
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    /**
     * Function that sets the information into the state
     * @param state Application's previous state
     */
    setInformation: (state, action) => {
      state.information = action.payload;
    },
    /**
     * Function that shows or hides the application's spinner
     * @param state Application's previous state
     * @param action Action fired by the application
     */
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    /**
     * Function that saves the companies after processing them
     * @param state Application's previous state
     * @param action Action fired by the application
     */
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInformation, setLoading, setCompanies } = appSlice.actions;

export default appSlice.reducer;
