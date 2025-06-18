import { createSlice } from "@reduxjs/toolkit";
import { userInitialState } from "./userSlice.types";

const initialState: userInitialState = {
  loggedInUser: null,
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

const { reducer, actions } = userSlice;
export { reducer };