"use client";

import React from "react";
import { IconButton } from "@mui/material";
import { useAppDispatch } from "@/utils/hooks";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutHandler } from "@/redux/features/authentication/authSlice";
import { clearLoggedInUserDetails } from "@/redux/features/user/userSlice";

const LogoutBtn = () => {
  const dispatch = useAppDispatch();

  return (
    <IconButton>
      <LogoutIcon
        onClick={() => {
          dispatch(logoutHandler());
          dispatch(clearLoggedInUserDetails());
          location.assign("/auth?type=login");
        }}
      />
    </IconButton>
  );
};

export { LogoutBtn };
