import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/authUtils";
import { AuthBtnProps } from "./authBtn.types";
import { AUTH_FIELDS } from "@/utils/constants";
import React, { useEffect, useMemo } from "react";
import {
  loginHandler,
  signupHandler,
  verifyHandler,
} from "@/redux/features/authentication/authSlice";
import { AuthFieldsKey } from "../authModal.types";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { loggedInUser } from "@/redux/features/user/userSlice.types";

const AuthBtn = ({
  tabValue,
  signupStep,
  textFieldInfo,
  setSignupStep,
}: AuthBtnProps) => {
  const router = useRouter();
  const token = getCookie("token");
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((store) => store.auth);

  const handleAuthBtnClick = () => {
    if (tabValue === "login") {
      dispatch(
        loginHandler({
          userEmail: textFieldInfo[AUTH_FIELDS.EMAIL_ID]?.value,
          userPwd: textFieldInfo[AUTH_FIELDS.AUTH_PWD]?.value,
        })
      ).then((res) => {
        const payload = res?.payload as loggedInUser;
        if (payload?._id) {
          router.replace("/feed");
        }
      });
    } else {
      if (signupStep == 1) {
        dispatch(
          signupHandler({
            firstName: textFieldInfo[AUTH_FIELDS.FIRST_NAME]?.value,
            userEmail: textFieldInfo[AUTH_FIELDS.EMAIL_ID]?.value,
            userPwd: textFieldInfo[AUTH_FIELDS.AUTH_PWD]?.value,
          })
        ).then((res) => {
          const payload = res?.payload as { email: string };
          if (payload?.email) {
            setSignupStep(2);
          }
        });
      } else {
        dispatch(
          verifyHandler({
            userEmail: textFieldInfo[AUTH_FIELDS.EMAIL_ID]?.value,
            otp: textFieldInfo[AUTH_FIELDS.AUTH_OTP]?.value,
          })
        ).then((res) => {
          const payload = res?.payload as loggedInUser;
          if (payload?._id) {
            router.replace("/profile?new=true");
          }
        });
      }
    }
  };

  useEffect(() => {
    if (token) {
      router.push("/feed");
    }
  }, [token, router]);

  const disableSubmitBtn = useMemo(() => {
    const shouldDisable = (Object.keys(AUTH_FIELDS) as AuthFieldsKey[]).some(
      (id) => {
        const field = textFieldInfo[id];
        if (tabValue === "login" && id === AUTH_FIELDS.FIRST_NAME) {
          return false;
        }
        if (
          tabValue === "signup" &&
          signupStep == 1 &&
          id === AUTH_FIELDS.AUTH_OTP
        ) {
          return false;
        }
        return field.value.length === 0 || field.error;
      }
    );

    return shouldDisable;
  }, [tabValue, textFieldInfo, signupStep]);

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      disabled={disableSubmitBtn}
      onClick={handleAuthBtnClick}
      loading={loading}
    >
      {tabValue === "login" ? "Login" : signupStep == 1 ? "Submit" : "Verify"}
    </Button>
  );
};

export { AuthBtn };
