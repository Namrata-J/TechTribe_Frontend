"use client";

import { useEffect } from "react";
import { getCookie, handleAuthenticationFailure } from "@/utils/authUtils";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { fetchLoggedInUserDetails } from "@/redux/features/user/userSlice";

const PrivateRoutesGuard = () => {
  const dispatch = useAppDispatch();
  const { loggedInUser, error, status } = useAppSelector((store) => store.user);

  useEffect(() => {
    dispatch(fetchLoggedInUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (error && status) {
      handleAuthenticationFailure(error, status, dispatch);
    }
  }, [dispatch, error, status]);

  useEffect(() => {
    if (!loggedInUser) {
      dispatch(fetchLoggedInUserDetails());
    }
    const token = getCookie("token") || "";
    if (!token) {
      location.assign("/auth?type=login&invalid=true");
    }
  }, [loggedInUser, dispatch]);

  return null;
};

export { PrivateRoutesGuard };
