import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/utils/constants";
import { deleteCookie, getCookie } from "@/utils/authUtils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthErrorPayload,
  AuthInitialState,
  loginHandlerPayload,
  signupHandlerPayload,
  verifyHandlerPayload,
} from "./authSlice.types";
import { loggedInUser } from "../user/userSlice.types";

const initialState: AuthInitialState = {
  userId: null,
  isUserLoggedIn: false,
  error: "",
  loading: false,
  userEmail: null,
};

const loginHandler = createAsyncThunk<
  loggedInUser | undefined,
  loginHandlerPayload,
  {
    rejectValue: AuthErrorPayload;
  }
>("auth/login", async ({ userEmail, userPwd }, thunkAPI) => {
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
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    console.log("ERROR OCCURED WHILE LOGIN", err);
    return thunkAPI.rejectWithValue({
      error: err?.response?.data?.message || "An unknown error occurred",
    });
  }
});

const signupHandler = createAsyncThunk<
  loggedInUser | undefined,
  signupHandlerPayload,
  {
    rejectValue: AuthErrorPayload;
  }
>("auth/signup", async ({ firstName, userEmail, userPwd }, thunkAPI) => {
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
      return { ...response?.data?.data };
    }

    return thunkAPI.rejectWithValue({
      error: "An unknown error occurred",
    });
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    console.log("ERROR OCCURED WHILE SIGNUP", err);
    return thunkAPI.rejectWithValue({
      error: err?.response?.data?.message || "An unknown error occurred",
    });
  }
});

const verifyHandler = createAsyncThunk<
  loggedInUser | undefined,
  verifyHandlerPayload,
  {
    rejectValue: AuthErrorPayload;
  }
>("auth/verify", async ({ userEmail, otp }, thunkAPI) => {
  try {
    const response = await axios({
      method: "post",
      url: "/verify",
      baseURL: BASE_URL,
      withCredentials: true,
      timeout: 5000,
      data: {
        otp,
        email: userEmail,
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
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    console.log("ERROR OCCURED WHILE VERIFY", err);
    return thunkAPI.rejectWithValue({
      error: err?.response?.data?.message || "An unknown error occurred",
    });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutHandler: (state) => {
      state.isUserLoggedIn = false;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInId");
      deleteCookie("token");
    },
    setInitialState: (state, action) => {
      state.isUserLoggedIn = action.payload.token ? true : false;
      state.userId = action.payload.userId;
    },
    stateReset: (state) => {
      state.loading = false;
      state.error = "";
      state.isUserLoggedIn = false;
      state.userId = null;
    },
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
        state.userId = action.payload?._id || null;
      })
      .addCase(loginHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "";
        state.isUserLoggedIn = false;
        state.userId = null;
      })
      .addCase(signupHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.userEmail = action.payload?.email || null;
      })
      .addCase(signupHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "";
        state.userEmail = null;
      })
      .addCase(verifyHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.isUserLoggedIn = true;
        state.userId = action.payload?._id || null;
      })
      .addCase(verifyHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "";
        state.isUserLoggedIn = false;
        state.userId = null;
      });
  },
});

export { loginHandler, signupHandler, verifyHandler };
const { reducer, actions } = authSlice;
export const { stateReset, logoutHandler, setInitialState } = actions;
export { reducer };
