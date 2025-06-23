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

type sendRequest = {
  fromUserId: string;
  toUserId: string;
  status: connectionRequestStatusType;
};

type reviewRequest = {
  fromUserId: string;
  toUserId: string;
  status: connectionRequestStatusType;
};

export type ConnectionRequestInitialState = {
  sendRequest: sendRequest | {};
  sendRequestLoading: boolean;
  sendRequestError: string;
  sendRequestStatus: number;
  reviewRequest: reviewRequest | {};
  reviewRequestLoading: boolean;
  reviewRequestError: string;
  reviewRequestStatus: number;
};
