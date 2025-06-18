"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/authUtils";

const PrivateRoutesGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token") || "";
    if (!token) {
      router.push("/auth?type=login");
    }
  }, []);

  return null;
};

export { PrivateRoutesGuard };
