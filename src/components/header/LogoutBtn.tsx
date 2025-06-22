"use client";

import React from "react";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/utils/hooks";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutHandler } from "@/redux/features/authentication/authSlice";

const LogoutBtn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <IconButton>
      <LogoutIcon onClick={() => {dispatch(logoutHandler());
      router.push('/auth?type=login')}} />
    </IconButton>
  );
};

export { LogoutBtn };
