import validator from "validator";
import { TextField } from "@mui/material";
import { AUTH_FIELDS } from "@/utils/constants";
import React, { useMemo, useState } from "react";
import { AuthFieldsKey } from "../authModal.types";
import { MuiOtpInput } from "mui-one-time-password-input";
import { AuthTextFieldsProps } from "./authTextFields.types";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { stateReset } from "@/redux/features/authentication/authSlice";

const AuthTextFields = ({
  tabValue,
  signupStep,
  textFieldInfo,
  setTextFieldInfo,
}: AuthTextFieldsProps) => {
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState<string>("");
  const { error: apiError } = useAppSelector((store) => store.auth);

  const fieldsList = useMemo(() => {
    return [
      ...(tabValue !== "login"
        ? [
            {
              id: AUTH_FIELDS.FIRST_NAME,
              label: "FirstName",
              type: "text",
            },
          ]
        : []),
      {
        id: AUTH_FIELDS.EMAIL_ID,
        label: "Email Id",
        type: "email",
      },
      {
        id: AUTH_FIELDS.AUTH_PWD,
        label: "Password",
        type: "password",
      },
    ];
  }, [tabValue]);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;
    const id = e.target?.id as AuthFieldsKey;
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

  const handleChange = (newValue: string) => {
    let error = false;
    let helperText = "";
    let id = AUTH_FIELDS.AUTH_OTP;

    setOtp(newValue);

    if (newValue?.length === 6) {
      setTextFieldInfo((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          value: newValue,
          helperText,
          error,
        },
      }));
    } else {
      setTextFieldInfo((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          value: newValue,
          helperText: "",
          error: true,
        },
      }));
    }
  };

  return tabValue === "signup" && signupStep == 2 ? (
    <MuiOtpInput
      length={6}
      value={otp}
      onChange={handleChange}
      sx={{
        "& .MuiOutlinedInput-input.MuiOutlinedInput-input": {
          padding: 0,
          minHeight: "3rem",
          height: "3rem",
        },
      }}
    />
  ) : (
    fieldsList.map((field) => (
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
    ))
  );
};

export { AuthTextFields };
