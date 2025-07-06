"use client";

import { useEffect } from "react";
import { getCookie } from "@/utils/authUtils";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { fetchLoggedInUserDetails } from "@/redux/features/user/userSlice";

const PrivateRoutesGuard = () => {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector((store) => store.user);

  useEffect(() => {
    if(!loggedInUser) {
      dispatch(fetchLoggedInUserDetails());
    }
    const token = getCookie("token") || "";
    if (!token) {
      location.assign('/auth?type=login&invalid=true');
    }
  }, []);

  return null;
};

export { PrivateRoutesGuard };
