import { createSlice } from "@reduxjs/toolkit";
import { AlertState } from "./alertSlice.types";

const initialState: AlertState = {
  severity: "success",
  text: "",
  isAlertVisible: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.severity = action.payload.severity;
      state.text = action.payload.text;
      state.isAlertVisible = true;
    },
    hideAlert: (state) => {
      state.isAlertVisible = false;
    },
  },
});

const { actions, reducer } = alertSlice;
export const { showAlert, hideAlert } = actions;
export { reducer };
