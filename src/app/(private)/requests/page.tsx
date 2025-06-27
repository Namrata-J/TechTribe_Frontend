"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { handleAuthenticationFailure } from "@/utils/authUtils";
import { ReceivedRequests } from "@/components/connection/ReceivedRequests";
import { fetchUserReceivedConnectionRequests } from "@/redux/features/user/userSlice";

const RequestsPage = () => {
  const dispatch = useAppDispatch();
  const { requestsError, requestsStatus } = useAppSelector(
    (store) => store.user
  );

  useEffect(() => {
    dispatch(fetchUserReceivedConnectionRequests());
  }, [dispatch]);

  useEffect(() => {
    if (requestsError && requestsStatus) {
      handleAuthenticationFailure(requestsError, requestsStatus, dispatch);
    }
  }, [dispatch, requestsError, requestsStatus]);

  return <ReceivedRequests />;
};

export default RequestsPage;
