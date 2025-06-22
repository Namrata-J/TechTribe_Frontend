import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { loggedInUser, userInitialState } from "./userSlice.types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "../alert/alertSlice";

const initialState: userInitialState = {
  loggedInUser: null,
  loading: false,
  error: "",
  status: 200,
  feed: [],
  feedLoading: false,
  feedError: "",
  feedStatus: 200,
  connections: [],
  connectionsLoading: false,
  connectionsError: "",
  connectionsStatus: 200,
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
      console.log("ERROR OCCURED WHILE FETCHING USER", error);
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "An unknown error occurred",
        status: error?.response?.status,
      });
    }
  }
);

const updateLoggedInUserDetails = createAsyncThunk(
  "/user/edit",
  async (data: Partial<loggedInUser>, thunkAPI) => {
    try {
      const response = await axios({
        method: "patch",
        url: "/profile/edit",
        baseURL: BASE_URL,
        withCredentials: true,
        timeout: 5000,
        data,
      });

      if (response?.data?.data) {
        thunkAPI.dispatch(
          showAlert({
            severity: "success",
            text: "Profile updated successfuly",
          })
        );
        return response?.data?.data;
      }

      return thunkAPI.rejectWithValue({
        error: "An unknown error occurred",
      });
    } catch (error: any) {
      console.log("ERROR OCCURED WHILE UPDATING USER", error);
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "An unknown error occurred",
        status: error?.response?.status,
      });
    }
  }
);

const fetchUserFeed = createAsyncThunk("/user/feed", async (data, thunkAPI) => {
  try {
    const response = await axios({
      method: "get",
      url: "/user/feed",
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
    console.log("ERROR OCCURED WHILE FETCHING USER FEED", error);
    return thunkAPI.rejectWithValue({
      error: error?.response?.data?.message || "An unknown error occurred",
      status: error?.response?.status,
    });
  }
});

const fetchUserConnections = createAsyncThunk(
  "/user/connections",
  async (data, thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url: "/user/connections",
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
      console.log("ERROR OCCURED WHILE FETCHING USER CONNECTIONS", error);
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "An unknown error occurred",
        status: error?.response?.status,
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
        state.status = action?.payload?.status;
      })
      .addCase(
        fetchLoggedInUserDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.loggedInUser = null;
          state.loading = false;
          state.error = action?.payload?.error || "";
          state.status = action?.payload?.status;
        }
      )
      .addCase(updateLoggedInUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLoggedInUserDetails.fulfilled, (state, action) => {
        state.loggedInUser = action.payload || null;
        state.loading = false;
        state.error = "";
        state.status = action?.payload?.status;
      })
      .addCase(
        updateLoggedInUserDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.loggedInUser = null;
          state.loading = false;
          state.error = action?.payload?.error || "";
          state.status = action?.payload?.status;
        }
      )
      .addCase(fetchUserFeed.pending, (state) => {
        state.feedLoading = true;
      })
      .addCase(fetchUserFeed.fulfilled, (state, action) => {
        state.feed = action.payload || [];
        state.feedLoading = false;
        state.feedError = "";
        state.feedStatus = action?.payload?.status;
      })
      .addCase(fetchUserFeed.rejected, (state, action: PayloadAction<any>) => {
        state.feed = [];
        state.feedLoading = false;
        state.feedError = action?.payload?.error || "";
        state.feedStatus = action?.payload?.status;
      })
      .addCase(fetchUserConnections.pending, (state) => {
        state.connectionsLoading = true;
      })
      .addCase(fetchUserConnections.fulfilled, (state, action) => {
        state.connections = action.payload || [];
        state.connectionsLoading = false;
        state.connectionsError = "";
        state.connectionsStatus = action?.payload?.status;
      })
      .addCase(
        fetchUserConnections.rejected,
        (state, action: PayloadAction<any>) => {
          state.connections = [];
          state.connectionsLoading = false;
          state.connectionsError = action?.payload?.error || "";
          state.connectionsStatus = action?.payload?.status;
        }
      );
  },
});

export {
  fetchUserFeed,
  fetchUserConnections,
  fetchLoggedInUserDetails,
  updateLoggedInUserDetails,
};
const { reducer, actions } = userSlice;
export { reducer };
