"use client";

import React, { useEffect } from "react";
import { getCookie } from "@/utils/authUtils";

const PrivateRoutesGuard = () => {

  useEffect(() => {
    const token = getCookie("token") || "";
    if (!token) {
      location.assign('/auth?type=login');
    }
  }, []);

  return null;
};

export { PrivateRoutesGuard };
