import { createSlice } from "@reduxjs/toolkit";

export interface Employee {
  ID_EMPRESA: number;
  ID_AREA: string;
  RUT_TRABAJADOR: string;
  NOMBRE_TRABAJADOR: string;
  EDAD: number;
  PROFESION: string | null;
  CARGO: string;
  CARGA_FAMILIAR: string[];
}

export interface IAggregateEmployee {
  [key: string]: { [key: string]: Employee[] };
}

/**
 * Application's interface that saves the important
 * data required for the application to work.
 */
export interface AppState {
  information: IAggregateEmployee;
  loading: boolean;
}

/**
 * The initial state of the application when booted up.
 */
const initialState: AppState = {
  information: {} as IAggregateEmployee,
  loading: false,
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
  },
});

// Action creators are generated for each case reducer function
export const { setInformation, setLoading } = appSlice.actions;

export default appSlice.reducer;
