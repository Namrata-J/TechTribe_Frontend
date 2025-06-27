type connectionRequestStatusType =
  | "ignored"
  | "interested"
  | "rejected"
  | "accepted";

export type SendConnectionRequest = {
  status: "ignored" | "interested";
  userId: string;
};

export type ReviewConnectionRequest = {
  status: "rejected" | "accepted";
  requestId: string;
};

export type sendRequest = {
  fromUserId: string;
  toUserId: string;
  status: connectionRequestStatusType;
};

export type reviewRequest = {
  fromUserId: string;
  toUserId: string;
  status: connectionRequestStatusType;
};

export type ConnectionRequestInitialState = {
  sendRequest: sendRequest | null;
  sendRequestLoading: boolean;
  sendRequestError: string;
  sendRequestStatus: number | undefined;
  reviewRequest: reviewRequest | null;
  reviewRequestLoading: boolean;
  reviewRequestError: string;
  reviewRequestStatus: number | undefined;
};

export type ConnectionRequestErrorPayload = {
  error?: string;
  status?: number
};