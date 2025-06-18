import React from "react";
import { Typography } from "@mui/material";
import { useAppSelector } from "@/utils/hooks";

const AuthHelperText = () => {
  const { error: apiError } = useAppSelector((store) => store.auth);
  return (
    apiError && (
      <Typography variant="subtitle2" component="div" color="error">
        {apiError}
      </Typography>
    )
  );
};

export { AuthHelperText };
