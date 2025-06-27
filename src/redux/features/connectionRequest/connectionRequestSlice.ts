import axios, { AxiosError } from "axios";
import {
  removeRequestIdFromReceivedRequests,
  removeRequestSendToUserIdfromFeed,
} from "../user/userSlice";
import {
  ConnectionRequestErrorPayload,
  ConnectionRequestInitialState,
  ReviewConnectionRequest,
  SendConnectionRequest,
  reviewRequest,
  sendRequest,
} from "./connectionRequest.types";
import { BASE_URL } from "@/utils/constants";
import { showAlert } from "../alert/alertSlice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: ConnectionRequestInitialState = {
  sendRequest: null,
  sendRequestLoading: false,
  sendRequestError: "",
  sendRequestStatus: 200,
  reviewRequest: null,
  reviewRequestLoading: false,
  reviewRequestError: "",
  reviewRequestStatus: 200,
};

const sendConnectionRequest = createAsyncThunk<
sendRequest,
SendConnectionRequest,
{
  rejectValue: ConnectionRequestErrorPayload;
}
>(
  "/connectionRequest/send",
  async ({ status, userId }, thunkAPI) => {
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
    } catch (error) {
      const err = error as AxiosError<{ message?: string, status?: number }>;

      console.log("ERROR OCCURED WHILE SENDING CONNECTION REQUEST", err);
      return thunkAPI.rejectWithValue({
        error: err?.response?.data?.message || "An unknown error occurred",
        status: err?.response?.status,
      });
    }
  }
);

const reviewConnectionRequest = createAsyncThunk<
reviewRequest,
ReviewConnectionRequest,
{
  rejectValue: ConnectionRequestErrorPayload;
}
>(
  "/connectionRequest/review",
  async ({ status, requestId }, thunkAPI) => {
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
    } catch (error) {
      const err = error as AxiosError<{ message?: string, status?: number }>;

      console.log("ERROR OCCURED WHILE SENDING CONNECTION REQUEST", err);
      return thunkAPI.rejectWithValue({
        error: err?.response?.data?.message || "An unknown error occurred",
        status: err?.response?.status,
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
        (state, action) => {
          state.sendRequest = action.payload || [];
          state.sendRequestLoading = false;
          state.sendRequestError = "";
          state.sendRequestStatus = 200;
        }
      )
      .addCase(
        sendConnectionRequest.rejected,
        (state, action) => {
          state.sendRequest = null;
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
        (state, action) => {
          state.reviewRequest = action.payload || [];
          state.reviewRequestLoading = false;
          state.reviewRequestError = "";
          state.reviewRequestStatus = 200;
        }
      )
      .addCase(
        reviewConnectionRequest.rejected,
        (state, action) => {
          state.reviewRequest = null;
          state.reviewRequestLoading = false;
          state.reviewRequestError = action?.payload?.error || "";
          state.reviewRequestStatus = action?.payload?.status;
        }
      );
  },
});

export { sendConnectionRequest, reviewConnectionRequest };
const { reducer } = connectionRequestSlice;
export { reducer };
