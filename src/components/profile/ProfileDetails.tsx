import React from "react";
import styles from "./profile.module.css";
import { Box, Container } from "@mui/material";
import { ProfileHeader } from "@/components/profile/profileHeader/ProfileHeader";
import { ProfileEditForm } from "@/components/profile/profileEditForm/ProfileEditForm";

const ProfileDetails = () => {
  return (
    <Container sx={{ padding: "6rem 0", maxWidth: "sm" }}>
      <Box className={styles.avatarWrapper}>
        <ProfileHeader />
      </Box>
      <Box className={styles.avatarWrapper} sx={{ marginTop: "2rem" }}>
        <ProfileEditForm />
      </Box>
    </Container>
  );
};

export { ProfileDetails };
