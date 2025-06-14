"use client";

import React from "react";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const AuthBtns = () => {
  const isLogin = false;

  return isLogin ? (
    <Link href="/">
      <Button variant="outlined" color="secondary" size="small">
        Go to feed
      </Button>
    </Link>
  ) : (
    <Stack direction="row" spacing={2}>
      <Link href="/auth/login">
        <Button color="secondary" size="small">
          Login
        </Button>
      </Link>
      <Link href="/">
        <Button variant="contained" color="primary" size="small">
          Sign Up
        </Button>
      </Link>
    </Stack>
  );
};

export { AuthBtns };
