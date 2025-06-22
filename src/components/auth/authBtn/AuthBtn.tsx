import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/authUtils";
import { AuthBtnProps } from "./authBtn.types";
import { AUTH_FIELDS } from "@/utils/constants";
import {
  loginHandler,
  signupHandler,
} from "@/redux/features/authentication/authSlice";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { AuthFieldsKey } from "../authModal.types";

const AuthBtn = ({ tabValue, textFieldInfo }: AuthBtnProps) => {
  const router = useRouter();
  const token = getCookie("token");
  const dispatch = useAppDispatch();
  const { userId, loading } = useAppSelector((store) => store.auth);

  const handleAuthBtnClick = () => {
    tabValue === "login"
      ? dispatch(
          loginHandler({
            userEmail: textFieldInfo[AUTH_FIELDS.EMAIL_ID]?.value,
            userPwd: textFieldInfo[AUTH_FIELDS.AUTH_PWD]?.value,
          })
        ).then((res) => {
          if (res?.payload?._id) {
            router.replace("/feed");
          }
        })
      : dispatch(
          signupHandler({
            firstName: textFieldInfo[AUTH_FIELDS.FIRST_NAME]?.value,
            userEmail: textFieldInfo[AUTH_FIELDS.EMAIL_ID]?.value,
            userPwd: textFieldInfo[AUTH_FIELDS.AUTH_PWD]?.value,
          })
        ).then((res) => {
          if (res?.payload?._id) {
            router.replace("/profile?new=true");
          }
        });
  };

  useEffect(() => {
    if (token) {
      router.push("/feed");
    }
  }, []);

  const disableSubmitBtn = useMemo(() => {
    const shouldDisable = (Object.keys(AUTH_FIELDS) as AuthFieldsKey[]).some((id) => {
      const field = textFieldInfo[id];
      if (tabValue === "login" && id === AUTH_FIELDS.FIRST_NAME) {
        return false;
      }
      return field.value.length === 0 || field.error;
    });
    return shouldDisable;
  }, [tabValue, textFieldInfo]);

  return (
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
  );
};

export { AuthBtn };
