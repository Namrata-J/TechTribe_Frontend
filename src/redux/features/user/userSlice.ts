import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { userInitialState } from "./userSlice.types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: userInitialState = {
  loggedInUser: null,
  loading: false,
  error: "",
  status: 200
};

const fetchLoggedInUserDetails = createAsyncThunk(
  "/user/view",
  async (data, thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url: "/profile/view",
        baseURL: BASE_URL,
        withCredentials: true,
        timeout: 5000,
      });

      if (response?.data?.data) {
        return response?.data?.data;
      }

      return thunkAPI.rejectWithValue({
        error: "An unknown error occurred",
      });
    } catch (error: any) {
      console.log("ERROR OCCURED WHILE LOGIN", error);
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "An unknown error occurred",
        status: error?.response?.status
      });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoggedInUserDetails.fulfilled, (state, action) => {
        state.loggedInUser = action.payload || null;
        state.loading = false;
        state.error = "";
      })
      .addCase(
        fetchLoggedInUserDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.loggedInUser = null;
          state.loading = false;
          state.error = action?.payload?.error || "";
          state.status = action?.payload?.status
        }
      );
  },
});

export { fetchLoggedInUserDetails };
const { reducer, actions } = userSlice;
export { reducer };
