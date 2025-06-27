"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { handleAuthenticationFailure } from "@/utils/authUtils";
import { fetchUserConnections } from "@/redux/features/user/userSlice";
import { UserConnections } from "@/components/connection/UserConnections";

const ConnectionsPage = () => {
  const dispatch = useAppDispatch();
  const { connectionsError, connectionsStatus } = useAppSelector(
    (store) => store.user
  );

  useEffect(() => {
    dispatch(fetchUserConnections());
  }, [dispatch]);

  useEffect(() => {
    if (connectionsError && connectionsStatus) {
      handleAuthenticationFailure(
        connectionsError,
        connectionsStatus,
        dispatch
      );
    }
  }, [dispatch, connectionsError, connectionsStatus]);

  return <UserConnections />;
};

export default ConnectionsPage;
