"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { handleAuthenticationFailure } from "@/utils/authUtils";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { fetchLoggedInUserDetails } from "@/redux/features/user/userSlice";

const ProfilePage = () => {
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

  return <ProfileDetails />;
};

export default ProfilePage;
