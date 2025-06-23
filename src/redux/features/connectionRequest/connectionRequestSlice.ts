import axios from "axios";
import {
  removeRequestIdFromReceivedRequests,
  removeRequestSendToUserIdfromFeed,
} from "../user/userSlice";
import {
  ConnectionRequestInitialState,
  ReviewConnectionRequest,
  SendConnectionRequest,
} from "./connectionRequest.types";
import { BASE_URL } from "@/utils/constants";
import { showAlert } from "../alert/alertSlice";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState: ConnectionRequestInitialState = {
  sendRequest: {},
  sendRequestLoading: false,
  sendRequestError: "",
  sendRequestStatus: 200,
  reviewRequest: {},
  reviewRequestLoading: false,
  reviewRequestError: "",
  reviewRequestStatus: 200,
};

const sendConnectionRequest = createAsyncThunk(
  "/connectionRequest/send",
  async ({ status, userId }: SendConnectionRequest, thunkAPI) => {
    try {
      const response = await axios({
        method: "post",
        url: `/connectionRequest/send/${status}/${userId}`,
        baseURL: BASE_URL,
        withCredentials: true,
        timeout: 5000,
      });

      if (response?.data?.data) {
        thunkAPI.dispatch(
          showAlert({
            severity: "success",
            text:
              status === "interested"
                ? "Connection request sent successfuly"
                : "Connection request ignored",
          })
        );

        thunkAPI.dispatch(
          removeRequestSendToUserIdfromFeed({ toUserId: userId })
        );
        return response?.data?.data;
      }

      thunkAPI.dispatch(
        showAlert({
          severity: "success",
          text: "Something went wrong",
        })
      );
      return thunkAPI.rejectWithValue({
        error: "An unknown error occurred",
      });
    } catch (error: any) {
      console.log("ERROR OCCURED WHILE SENDING CONNECTION REQUEST", error);
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "An unknown error occurred",
        status: error?.response?.status,
      });
    }
  }
);

const reviewConnectionRequest = createAsyncThunk(
  "/connectionRequest/review",
  async ({ status, requestId }: ReviewConnectionRequest, thunkAPI) => {
    try {
      const response = await axios({
        method: "patch",
        url: `/connectionRequest/review/${status}/${requestId}`,
        baseURL: BASE_URL,
        withCredentials: true,
        timeout: 5000,
      });

      if (response?.data?.data) {
        thunkAPI.dispatch(
          showAlert({
            severity: "success",
            text:
              status === "accepted"
                ? "Connection request accepted successfuly"
                : "Connection request rejected",
          })
        );

        thunkAPI.dispatch(removeRequestIdFromReceivedRequests({ requestId }));
        return response?.data?.data;
      }

      thunkAPI.dispatch(
        showAlert({
          severity: "success",
          text: "Something went wrong",
        })
      );
      return thunkAPI.rejectWithValue({
        error: "An unknown error occurred",
      });
    } catch (error: any) {
      console.log("ERROR OCCURED WHILE SENDING CONNECTION REQUEST", error);
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "An unknown error occurred",
        status: error?.response?.status,
      });
    }
  }
);

const connectionRequestSlice = createSlice({
  name: "connectionRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendConnectionRequest.pending, (state) => {
        state.sendRequestLoading = true;
      })
      .addCase(
        sendConnectionRequest.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.sendRequest = action.payload || [];
          state.sendRequestLoading = false;
          state.sendRequestError = "";
          state.sendRequestStatus = action?.payload?.status;
        }
      )
      .addCase(
        sendConnectionRequest.rejected,
        (state, action: PayloadAction<any>) => {
          state.sendRequest = [];
          state.sendRequestLoading = false;
          state.sendRequestError = action?.payload?.error || "";
          state.sendRequestStatus = action?.payload?.status;
        }
      )
      .addCase(reviewConnectionRequest.pending, (state) => {
        state.reviewRequestLoading = true;
      })
      .addCase(
        reviewConnectionRequest.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.reviewRequest = action.payload || [];
          state.reviewRequestLoading = false;
          state.reviewRequestError = "";
          state.reviewRequestStatus = action?.payload?.status;
        }
      )
      .addCase(
        reviewConnectionRequest.rejected,
        (state, action: PayloadAction<any>) => {
          state.reviewRequest = [];
          state.reviewRequestLoading = false;
          state.reviewRequestError = action?.payload?.error || "";
          state.reviewRequestStatus = action?.payload?.status;
        }
      );
  },
});

export { sendConnectionRequest, reviewConnectionRequest };
const { reducer, actions } = connectionRequestSlice;
export { reducer };
