import {
  UserErrorPayload,
  loggedInUser,
  request,
  userInitialState,
} from "./userSlice.types";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/utils/constants";
import { showAlert } from "../alert/alertSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  requests: [],
  requestsLoading: false,
  requestsError: "",
  requestsStatus: 200,
};

const fetchLoggedInUserDetails = createAsyncThunk<
  loggedInUser,
  void,
  {
    rejectValue: UserErrorPayload;
  }
>("/user/view", async (_, thunkAPI) => {
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
  } catch (error) {
    const err = error as AxiosError<{ message?: string; status?: number }>;

    console.log("ERROR OCCURED WHILE FETCHING USER", err);
    return thunkAPI.rejectWithValue({
      error: err?.response?.data?.message || "An unknown error occurred",
      status: err?.response?.status,
    });
  }
});

const updateLoggedInUserDetails = createAsyncThunk<
  loggedInUser,
  Partial<loggedInUser>,
  {
    rejectValue: UserErrorPayload;
  }
>("/user/edit", async (data, thunkAPI) => {
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
  } catch (error) {
    const err = error as AxiosError<{ message?: string; status?: number }>;

    console.log("ERROR OCCURED WHILE UPDATING USER", err);
    return thunkAPI.rejectWithValue({
      error: err?.response?.data?.message || "An unknown error occurred",
      status: err?.response?.status,
    });
  }
});

const fetchUserFeed = createAsyncThunk<
  loggedInUser[],
  { page: number; limit: number },
  {
    rejectValue: UserErrorPayload;
  }
>("/user/feed", async ({ page, limit }, thunkAPI) => {
  try {
    const response = await axios({
      method: "get",
      url: `/user/feed?page=${page}&limit=${limit}`,
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
  } catch (error) {
    const err = error as AxiosError<{ message?: string; status?: number }>;

    console.log("ERROR OCCURED WHILE FETCHING USER FEED", err);
    return thunkAPI.rejectWithValue({
      error: err?.response?.data?.message || "An unknown error occurred",
      status: err?.response?.status,
    });
  }
});

const fetchUserConnections = createAsyncThunk<
  loggedInUser[],
  void,
  {
    rejectValue: UserErrorPayload;
  }
>("/user/connections", async (_, thunkAPI) => {
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
  } catch (error) {
    const err = error as AxiosError<{ message?: string; status?: number }>;

    console.log("ERROR OCCURED WHILE FETCHING USER CONNECTIONS", err);
    return thunkAPI.rejectWithValue({
      error: err?.response?.data?.message || "An unknown error occurred",
      status: err?.response?.status,
    });
  }
});

const fetchUserReceivedConnectionRequests = createAsyncThunk<
  request[],
  void,
  {
    rejectValue: UserErrorPayload;
  }
>("/user/requests/received", async (_, thunkAPI) => {
  try {
    const response = await axios({
      method: "get",
      url: "/user/requests/received",
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
  } catch (error) {
    const err = error as AxiosError<{ message?: string; error?: number }>;

    console.log("ERROR OCCURED WHILE FETCHING USER RECEIVED REQUESTS", err);
    return thunkAPI.rejectWithValue({
      error: err?.response?.data?.message || "An unknown error occurred",
      status: err?.response?.status,
    });
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeRequestSendToUserIdfromFeed: (state, action) => {
      state.feed = state.feed.filter(
        (user) => user?._id !== action.payload?.toUserId
      );
    },
    removeRequestIdFromReceivedRequests: (state, action) => {
      state.requests = state.requests.filter(
        (request) => request?._id !== action.payload?.requestId
      );
    },
    clearLoggedInUserDetails: (state) => {
      state.loggedInUser = null;
      state.loading = false;
      state.error = "";
      state.status = 200;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoggedInUserDetails.fulfilled, (state, action) => {
        state.loggedInUser = action.payload || null;
        state.loading = false;
        state.error = "";
        state.status = 200;
      })
      .addCase(fetchLoggedInUserDetails.rejected, (state, action) => {
        state.loggedInUser = null;
        state.loading = false;
        state.error = action?.payload?.error || "";
        state.status = action?.payload?.status;
      })
      .addCase(updateLoggedInUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLoggedInUserDetails.fulfilled, (state, action) => {
        state.loggedInUser = action.payload || null;
        state.loading = false;
        state.error = "";
        state.status = 200;
      })
      .addCase(updateLoggedInUserDetails.rejected, (state, action) => {
        state.loggedInUser = null;
        state.loading = false;
        state.error = action?.payload?.error || "";
        state.status = action?.payload?.status;
      })
      .addCase(fetchUserFeed.pending, (state) => {
        state.feedLoading = true;
      })
      .addCase(fetchUserFeed.fulfilled, (state, action) => {
        state.feed = action.payload || [];
        state.feedLoading = false;
        state.feedError = "";
        state.feedStatus = 200;
      })
      .addCase(fetchUserFeed.rejected, (state, action) => {
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
        state.connectionsStatus = 200;
      })
      .addCase(fetchUserConnections.rejected, (state, action) => {
        state.connections = [];
        state.connectionsLoading = false;
        state.connectionsError = action?.payload?.error || "";
        state.connectionsStatus = action?.payload?.status;
      })
      .addCase(fetchUserReceivedConnectionRequests.pending, (state) => {
        state.requestsLoading = true;
      })
      .addCase(
        fetchUserReceivedConnectionRequests.fulfilled,
        (state, action) => {
          state.requests = action.payload || [];
          state.requestsLoading = false;
          state.requestsError = "";
          state.requestsStatus = 200;
        }
      )
      .addCase(
        fetchUserReceivedConnectionRequests.rejected,
        (state, action) => {
          state.requests = [];
          state.requestsLoading = false;
          state.requestsError = action?.payload?.error || "";
          state.requestsStatus = action?.payload?.status;
        }
      );
  },
});

export {
  fetchUserFeed,
  fetchUserConnections,
  fetchLoggedInUserDetails,
  updateLoggedInUserDetails,
  fetchUserReceivedConnectionRequests,
};
const { reducer, actions } = userSlice;
export const {
  clearLoggedInUserDetails,
  removeRequestSendToUserIdfromFeed,
  removeRequestIdFromReceivedRequests,
} = actions;
export { reducer };
