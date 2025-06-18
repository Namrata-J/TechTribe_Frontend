import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { getCookie } from "@/utils/authUtils";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthInitialState, loginHandlerPayload, signupHandlerPayload } from "./authSlice.types";

const initialState: AuthInitialState = {
  userId: null,
  encodedToken: null,
  isUserLoggedIn: false,
  error: "",
  loading: false,
};

const loginHandler = createAsyncThunk(
  "auth/login",
  async ({ userEmail, userPwd }: loginHandlerPayload, thunkAPI) => {
    try {
      const response = await axios({
        method: "post",
        url: "/login",
        baseURL: BASE_URL,
        withCredentials: true,
        timeout: 5000,
        data: {
          email: userEmail,
          password: userPwd,
        },
      });

      // set token and userid in localstorage
      if (response?.data?.data) {
        const token = getCookie("token") || "";
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInId", response?.data?.data?._id);
        return { ...response?.data?.data, token };
      }

      return thunkAPI.rejectWithValue({
        error: "An unknown error occurred",
      });
    } catch (error: any) {
      console.log("ERROR OCCURED WHILE LOGIN", error);
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "An unknown error occurred",
      });
    }
  }
);

const signupHandler = createAsyncThunk(
  "auth/signup",
  async ({ firstName, userEmail, userPwd }: signupHandlerPayload, thunkAPI) => {
    try {
      const response = await axios({
        method: "post",
        url: "/signup",
        baseURL: BASE_URL,
        withCredentials: true,
        timeout: 5000,
        data: {
          firstName,
          email: userEmail,
          password: userPwd,
        },
      });

      // set token and userid in localstorage
      if (response?.data?.data) {
        const token = getCookie("token") || "";
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInId", response?.data?.data?._id);
        return { ...response?.data?.data, token };
      }

      return thunkAPI.rejectWithValue({
        error: "An unknown error occurred",
      });
    } catch (error: any) {
      console.log("ERROR OCCURED WHILE LOGIN", error);
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "An unknown error occurred",
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutHandler: (state) => {
      state.encodedToken = null;
      state.isUserLoggedIn = false;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInId");
    },
    setInitialState: (state, action) => {
      state.encodedToken = action.payload.token;
      state.isUserLoggedIn = action.payload.token ? true : false;
      state.userId = action.payload.userId;
    },
    stateReset: (state) => {
      state.loading = false;
      state.error = "";
      state.isUserLoggedIn = false;
      state.userId = null;
      state.encodedToken = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.isUserLoggedIn = true;
        state.userId = action.payload._id || null;
        state.encodedToken = action.payload.token || null;
      })
      .addCase(loginHandler.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error || "";
        state.isUserLoggedIn = false;
        state.userId = null;
        state.encodedToken = null;
      })
      .addCase(signupHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.isUserLoggedIn = true;
        state.userId = action.payload._id || null;
        state.encodedToken = action.payload.token || null;
      })
      .addCase(signupHandler.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.error || "";
        state.isUserLoggedIn = false;
        state.userId = null;
        state.encodedToken = null;
      });
  },
});

export { loginHandler, signupHandler };
const { reducer, actions } = authSlice;
export const { stateReset, logoutHandler, setInitialState } = actions;
export { reducer };
