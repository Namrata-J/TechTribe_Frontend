"use client";

import React from "react";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";
import { getCookie } from "@/utils/authUtils";

const AuthBtns = () => {
  const token = getCookie("token");
  const isLogin = token ? true : false;
  const pathname = usePathname();
  const isAuthSegment = pathname.startsWith("/auth");

  return !isAuthSegment ? (
    isLogin ? (
      <Link href="/feed">
        <Button variant="outlined" color="secondary" size="small">
          Go to feed
        </Button>
      </Link>
    ) : (
      <Stack direction="row" spacing={2}>
        <Link href="/auth?type=login">
          <Button color="secondary" size="small">
            Login
          </Button>
        </Link>
        <Link href="/auth?type=signup">
          <Button variant="contained" color="primary" size="small">
            Sign Up
          </Button>
        </Link>
      </Stack>
    )
  ) : null;
};

export { AuthBtns };
