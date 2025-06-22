"use client";

import React, { useState } from "react";
import styles from "./footer.module.css";
import FeedIcon from "@mui/icons-material/Feed";
import ForumIcon from "@mui/icons-material/Forum";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathnameVal = pathname.split("/");
  const [value, setValue] = useState(pathnameVal[1]);
  const isNewUser = searchParams.get("new") === "true";
  const navigationList = [
    {
      label: "Feed",
      value: "feed",
      icon: <FeedIcon />,
      onClickHandler: () => router.push("/feed"),
    },
    {
      label: "Connections",
      value: "connections",
      icon: <GroupIcon />,
      onClickHandler: () => router.push("/connections"),
    },
    {
      label: "Requests",
      value: "requests",
      icon: <ForumIcon />,
      onClickHandler: () => router.push("/requests"),
    },
    {
      label: "Profile",
      value: "profile",
      icon: <PersonIcon />,
      onClickHandler: () => router.push("/profile"),
    },
  ];

  return isNewUser ? null : (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 99 }}
      elevation={3}
    >
      <BottomNavigation
        sx={{
          "&.MuiBottomNavigation-root": {
            height: "3.5rem",
          },
        }}
        className={styles.navigationWrapper}
        showLabels
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
      >
        {navigationList.map((navigation) => (
          <BottomNavigationAction
            onClick={navigation.onClickHandler}
            key={navigation.value}
            label={navigation.label}
            value={navigation.value}
            icon={navigation.icon}
            sx={{
              "& .MuiSvgIcon-root": {
                width: "0.6em",
                height: "0.6em",
              },
              "& .MuiBottomNavigationAction-label": {
                fontSize: "0.7rem",
                "&.Mui-selected": {
                  fontSize: "0.7rem",
                },
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export { Footer };
