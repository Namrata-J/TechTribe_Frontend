"use client";

import styles from "./alert.module.css";
import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { hideAlert } from "@/redux/features/alert/alertSlice";
import { Box } from "@mui/material";
import { flexWithCenter } from "@/utils/styles";

const AlertComp = () => {
  const dispatch = useAppDispatch();
  const { severity, text, isAlertVisible } = useAppSelector(
    (store) => store.alert
  );

  useEffect(() => {
    if (isAlertVisible) {
      setTimeout(() => {
        dispatch(hideAlert());
      }, 3000);
    }
  }, [isAlertVisible]);

  return isAlertVisible ? (
    <Box className={styles.alertBox} sx={flexWithCenter}>
      <Alert className={styles.alert} variant="filled" severity={severity}>
        {text}
      </Alert>
    </Box>
  ) : null;
};

export { AlertComp };
