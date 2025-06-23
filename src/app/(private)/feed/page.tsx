"use client";

import React, { useEffect } from "react";
import { Feed } from "@/components/feed/Feed";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { handleAuthenticationFailure } from "@/utils/authUtils";

const FeedPage = () => {
  const dispatch = useAppDispatch();
  const { feedError, feedStatus } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (feedError && feedStatus) {
      handleAuthenticationFailure(feedError, feedStatus, dispatch);
    }
  }, [feedError, feedStatus]);

  return <Feed />;
};

export default FeedPage;
