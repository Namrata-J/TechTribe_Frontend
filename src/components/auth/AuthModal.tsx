"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import styles from "./authModal.module.css";
import { AuthBtn } from "./authBtn/AuthBtn";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import { AuthTabs } from "./authTabs/AuthTabs";
import { flexWithCenter } from "@/utils/styles";
import { AUTH_FIELDS } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { AuthTextFields } from "./authTextFields/AuthTextFields";
import { AuthHelperText } from "./authHelperText/AuthHelperText";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { SignUpStepType, TextFieldInfoType } from "./authModal.types";
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
  height: "27rem",
}));

const AuthModalComp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const authType = searchParams.get("type");
  const isInvalid = searchParams.get("invalid") === "true";
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
    [AUTH_FIELDS.AUTH_OTP]: {
      value: "",
      helperText: "",
      error: false,
    },
  });
  const [signupStep, setSignupStep] = useState<SignUpStepType>(1);
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
      {!isInvalid && <StyledCancelIcon onClick={handleClose} />}
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <AuthTabs setTabValue={setTabValue} setSignupStep={setSignupStep} />
        </Box>
        <StyledTabPanel value={tabValue}>
          <Box
            sx={{ ...flexWithCenter, flexDirection: "column", gap: "0.8rem" }}
          >
            {tabValue === "signup" && (
              <Typography className={styles.description} color="grey.500">
                {signupStep == 1
                  ? "An otp will be sent over your email Id for verification purposes"
                  : `Please enter the 6-digit otp sent over to you on ${
                      textFieldInfo[AUTH_FIELDS.EMAIL_ID].value
                    }`}
              </Typography>
            )}
            <AuthTextFields
              tabValue={tabValue}
              signupStep={signupStep}
              textFieldInfo={textFieldInfo}
              setTextFieldInfo={setTextFieldInfo}
            />
            <AuthHelperText />
          </Box>
          <AuthBtn
            tabValue={tabValue}
            signupStep={signupStep}
            textFieldInfo={textFieldInfo}
            setSignupStep={setSignupStep}
          />
        </StyledTabPanel>
      </TabContext>
    </Box>
  );
};

export { AuthModalComp };
