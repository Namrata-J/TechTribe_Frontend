"use client";

import React, { useEffect } from "react";
import { Feed } from "@/components/feed/Feed";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { fetchUserFeed } from "@/redux/features/user/userSlice";
import { handleAuthenticationFailure } from "@/utils/authUtils";

const FeedPage = () => {
  const dispatch = useAppDispatch();
  const { feedError, feedStatus } = useAppSelector((store) => store.user);

  useEffect(() => {
    dispatch(fetchUserFeed());
  }, []);

  useEffect(() => {
    if (feedError && feedStatus) {
      handleAuthenticationFailure(feedError, feedStatus, dispatch);
    }
  }, [feedError, feedStatus]);

  return <Feed />;
};

export default FeedPage;
