import React from "react";
import { Box } from "@mui/material";
import styles from "./page.module.css";
import { flexWithCenter } from "@/utils/styles";
import { AuthModalComp } from "@/components/auth/AuthModal";

const AuthPage = () => {
  return (
    <Box sx={flexWithCenter} className={styles.modalWrapper}>
      <Box className={styles.modal}>
        <AuthModalComp />
      </Box>
    </Box>
  );
};

export default AuthPage;
