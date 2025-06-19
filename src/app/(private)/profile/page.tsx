"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { handleAuthenticationFailure } from "@/utils/authUtils";
import { fetchLoggedInUserDetails } from "@/redux/features/user/userSlice";

const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((store) => store.user);

  useEffect(() => {
    dispatch(fetchLoggedInUserDetails());
  }, []);

  useEffect(() => {
    if (error && status) {
      handleAuthenticationFailure(error, status, dispatch);
    }
  }, [error, status]);

  return <></>;
};

export default ProfilePage;
