"use client";

import React from "react";
import { Box } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import styles from "./authModal.module.css";
import { AuthBtn } from "./authBtn/AuthBtn";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import { AuthTabs } from "./authTabs/AuthTabs";
import { flexWithCenter } from "@/utils/styles";
import { AUTH_FIELDS } from "@/utils/constants";
import { TextFieldInfoType } from "./authModal.types";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { AuthTextFields } from "./authTextFields/AuthTextFields";
import { AuthHelperText } from "./authHelperText/AuthHelperText";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { stateReset } from "@/redux/features/authentication/authSlice";

const StyledCancelIcon = styled(CancelTwoToneIcon)(({ theme }) => ({
  position: "absolute",
  right: "2px",
  top: "2px",
  zIndex: 2,
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.error.light,
  },
}));

const StyledTabPanel = styled(TabPanel)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.8rem",
  flexDirection: "column",
  height: "22rem",
}));

const AuthModalComp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const authType = searchParams.get("type");
  const [tabValue, setTabValue] = useState<"login" | "signup">(
    authType === "login" ? "login" : "signup"
  );
  const [textFieldInfo, setTextFieldInfo] = useState<TextFieldInfoType>({
    [AUTH_FIELDS.FIRST_NAME]: {
      value: "",
      helperText: "Please enter your firstname",
      error: false,
    },
    [AUTH_FIELDS.EMAIL_ID]: {
      value: "",
      helperText: "Please enter a valid email Id",
      error: false,
    },
    [AUTH_FIELDS.AUTH_PWD]: {
      value: "",
      helperText: "Please enter a strong password",
      error: false,
    },
  });
  const { error: apiError } = useAppSelector((store) => store.auth);

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    return () => {
      if (apiError) {
        dispatch(stateReset());
      }
    };
  }, [apiError, dispatch]);

  return (
    <Box
      sx={{ backgroundColor: "background.paper", position: "relative" }}
      className={styles.modal}
    >
      <StyledCancelIcon onClick={handleClose} />
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <AuthTabs setTabValue={setTabValue} />
        </Box>
        <StyledTabPanel value={tabValue}>
          <Box
            sx={{ ...flexWithCenter, flexDirection: "column", gap: "0.8rem" }}
          >
            <AuthTextFields
              tabValue={tabValue}
              textFieldInfo={textFieldInfo}
              setTextFieldInfo={setTextFieldInfo}
            />
            <AuthHelperText />
          </Box>
          <AuthBtn tabValue={tabValue} textFieldInfo={textFieldInfo} />
        </StyledTabPanel>
      </TabContext>
    </Box>
  );
};

export { AuthModalComp };
