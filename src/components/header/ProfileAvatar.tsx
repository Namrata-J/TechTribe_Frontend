'use client'

import { useAppSelector } from "@/utils/hooks";
import { Avatar } from "@mui/material";
import React from "react";

const ProfileAvatar = () => {
  const { loggedInUser } = useAppSelector((store) => store.user);
  if(!loggedInUser) return null;
  const { photoUrl, firstName } = loggedInUser;

  return photoUrl ? <Avatar alt={firstName} src={photoUrl}  sx={{ width: 20, height: 20 }} /> : null
};

export { ProfileAvatar };
