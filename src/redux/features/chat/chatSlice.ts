import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/utils/constants";
import { Message } from "@/components/chat/chat.types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ChatErrorPayload, chatInitialState } from "./chatSlice.types";

const initialState: chatInitialState = {
  messagesList: [],
  loading: false,
  error: "",
  status: 200,
};

const fetchMessages = createAsyncThunk<
  Message[],
  { receiverId: string },
  {
    rejectValue: ChatErrorPayload;
  }
>("/chat/fetchMessages", async ({ receiverId }, thunkAPI) => {
  try {
    const response = await axios({
      method: "get",
      url: `/chat/retrieve/${receiverId}`,
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

    console.log("ERROR OCCURED WHILE FETCHING CHAT", err);
    return thunkAPI.rejectWithValue({
      error: err?.response?.data?.message || "An unknown error occurred",
      status: err?.response?.status,
    });
  }
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messagesList.push(action.payload);
    },
    clearMessages: (state) => {
      state.messagesList = [];
      state.loading = false;
      state.error = "";
      state.status = 200;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messagesList = action.payload;
        state.error = "";
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        const errorPayload = action.payload as ChatErrorPayload;
        state.loading = false;
        state.error = errorPayload.error;
        state.status = errorPayload.status || 500;
      });
  },
});

export { fetchMessages };
const { actions, reducer } = chatSlice;
export const { addMessage, clearMessages } = actions;
export { reducer };
