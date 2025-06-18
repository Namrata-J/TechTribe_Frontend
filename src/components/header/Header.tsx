import * as React from "react";
import Box from "@mui/material/Box";
import { AuthBtns } from "./AuthBtns";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { headerProps } from "./header.types";
import { Logo } from "@/components/header/Logo";
import Typography from "@mui/material/Typography";
import { ToggleThemeBtn } from "./ToggleThemeBtn";
import { flexWithCenter, flexWithStart } from "@/utils/styles";
import { ProfileAvatar } from "./ProfileAvatar";

const Header = ({ isAppHeader }: headerProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        top: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            ...flexWithStart,
            gap: "0.5rem",
          }}
        >
          <Logo />
          <Typography variant="h6" component="div">
            TechTribe
          </Typography>
        </Box>
        <Box sx={{ ...flexWithCenter, gap: "1.5rem" }}>
          {!isAppHeader && <AuthBtns />}
          <ToggleThemeBtn />
          {isAppHeader && <ProfileAvatar />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
