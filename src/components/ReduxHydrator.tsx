"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitialState } from "@/redux/features/authentication/authSlice";

const ReduxHydrator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("loggedInId");
    if (token) {
      dispatch(setInitialState({ token, userId }));
    }
  }, []);

  return null;
};

export { ReduxHydrator };
