import React from "react";
import { Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import { useAppDispatch } from "@/utils/hooks";
import { AuthTabProps } from "./authTabs.types";
import { stateReset } from "@/redux/features/authentication/authSlice";

const AuthTabs = ({ setTabValue }: AuthTabProps) => {
  const dispatch = useAppDispatch();

  const tabStyle = {
    minHeight: 0,
    padding: "0 1.5rem",
    minWidth: "fit-content",
    fontWeight: "600",
  };

  const handleChange = (event: React.SyntheticEvent, newValue: 'login' | 'signup') => {
    setTabValue(newValue);
    dispatch(stateReset());
  };

  return (
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
  );
};

export { AuthTabs };
