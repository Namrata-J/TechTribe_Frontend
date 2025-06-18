"use client";

import validator from "validator";
import styles from "./page.module.css";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import { flexWithCenter } from "@/utils/styles";
import { AUTH_FIELDS } from "@/utils/constants";
import {
  loginHandler,
  signupHandler,
  stateReset,
} from "@/redux/features/authentication/authSlice";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { Box, Button, Modal, Tab, TextField, Typography } from "@mui/material";

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

const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.8rem",
  flexDirection: "column",
  height: "22rem",
}));

const AuthModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const authType = searchParams.get("type");
  const [tabValue, setTabValue] = useState(
    authType === "login" ? "login" : "signup"
  );
  const [textFieldInfo, setTextFieldInfo] = useState({
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
  const { error: apiError, loading } = useAppSelector((store) => store.auth);

  const handleClose = () => {
    router.back();
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    dispatch(stateReset());
  };

  const handleAuthBtnClick = () => {
    tabValue === "login"
      ? dispatch(
          loginHandler({
            userEmail: textFieldInfo[AUTH_FIELDS.EMAIL_ID]?.value,
            userPwd: textFieldInfo[AUTH_FIELDS.AUTH_PWD]?.value,
          })
        )
      : dispatch(
          signupHandler({
            firstName: textFieldInfo[AUTH_FIELDS.FIRST_NAME]?.value,
            userEmail: textFieldInfo[AUTH_FIELDS.EMAIL_ID]?.value,
            userPwd: textFieldInfo[AUTH_FIELDS.AUTH_PWD]?.value,
          })
        );
  };

  const tabStyle = {
    minHeight: 0,
    padding: "0 1.5rem",
    minWidth: "fit-content",
    fontWeight: "600",
  };

  const fieldsList = useMemo(() => {
    return [
      ...(tabValue !== "login"
        ? [
            {
              helperText: textFieldInfo[AUTH_FIELDS.FIRST_NAME]?.helperText,
              id: AUTH_FIELDS.FIRST_NAME,
              error: false,
              label: "FirstName",
              type: "text",
            },
          ]
        : []),
      {
        helperText: textFieldInfo[AUTH_FIELDS.EMAIL_ID]?.helperText,
        id: AUTH_FIELDS.EMAIL_ID,
        error: false,
        label: "Email Id",
        type: "email",
      },
      {
        helperText: textFieldInfo[AUTH_FIELDS.AUTH_PWD]?.helperText,
        id: AUTH_FIELDS.AUTH_PWD,
        error: false,
        label: "Password",
        type: "password",
      },
    ];
  }, [tabValue]);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;
    const id = e.target?.id;
    let helperText = "";
    let error = false;

    if (value.length == 0) {
      helperText = `Please enter your ${
        id === AUTH_FIELDS.FIRST_NAME
          ? "firstname"
          : id === AUTH_FIELDS.EMAIL_ID
          ? "email Id"
          : "password"
      }`;
      error = false;
    } else {
      if (
        id === AUTH_FIELDS.FIRST_NAME &&
        (value.length < 2 || value.length > 50)
      ) {
        helperText = `Name should be >2 characters and <50 characters`;
        error = true;
      } else if (id === AUTH_FIELDS.EMAIL_ID && !validator.isEmail(value)) {
        helperText = `Invalid email Id`;
        error = true;
      } else if (
        id === AUTH_FIELDS.AUTH_PWD &&
        !validator.isStrongPassword(value)
      ) {
        helperText = `Password should be >=8 characters. Minimum 1 lowercase, uppercase, number and symbol.`;
        error = true;
      } else {
        helperText = ``;
        error = false;
      }
    }

    setTextFieldInfo((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        value,
        helperText,
        error,
      },
    }));

    if (apiError) {
      dispatch(stateReset());
    }
  };

  const disableSubmitBtn = useMemo(() => {
    const shouldDisable = Object.keys(AUTH_FIELDS).some((id) => {
      const field = textFieldInfo[id];
      if (tabValue === "login" && id === AUTH_FIELDS.FIRST_NAME) {
        return false;
      }
      return field.value.length === 0 || field.error;
    });
    return shouldDisable;
  }, [tabValue, textFieldInfo]);

  useEffect(() => {
    return () => {
      if (apiError) {
        dispatch(stateReset());
      }
    };
  }, []);

  return (
    <Modal sx={flexWithCenter} open={true} aria-labelledby="auth">
      <Box
        sx={{ backgroundColor: "background.paper", position: "relative" }}
        className={styles.modal}
      >
        <StyledCancelIcon onClick={handleClose} />
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="auth tabs"
              sx={{
                minHeight: 0,
                height: "38px",
                "& .MuiTabs-list": {
                  height: "38px",
                },
                "& .MuiTabs-indicator": {
                  height: "1.5px",
                },
              }}
            >
              <Tab label="Login" value="login" sx={tabStyle} />
              <Tab label="Signup" value="signup" sx={tabStyle} />
            </TabList>
          </Box>
          <StyledTabPanel value={tabValue}>
            <Box
              sx={{ ...flexWithCenter, flexDirection: "column", gap: "0.8rem" }}
            >
              {fieldsList.map((field) => (
                <TextField
                  key={field?.id}
                  label={field?.label}
                  helperText={textFieldInfo[field?.id]?.helperText}
                  id={field?.id}
                  error={textFieldInfo[field?.id]?.error}
                  type={field?.type}
                  onChange={handleTextFieldChange}
                  value={textFieldInfo[field?.id]?.value}
                />
              ))}
              {apiError && (
                <Typography variant="subtitle2" component="div" color="error">
                  {apiError}
                </Typography>
              )}
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={disableSubmitBtn}
              onClick={handleAuthBtnClick}
              loading={loading}
            >
              {tabValue === "login" ? "Login" : "Sign Up"}
            </Button>
          </StyledTabPanel>
        </TabContext>
      </Box>
    </Modal>
  );
};

export default AuthModal;
