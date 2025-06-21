import React from "react";
import { flexWithStart } from "@/utils/styles";
import { useAppSelector } from "@/utils/hooks";
import { useTheme } from "@/app/_theme/ThemeRegistery";
import { Avatar, Box, Typography } from "@mui/material";

const ProfileHeader = () => {
  const { mode } = useTheme();
  const { loggedInUser } = useAppSelector((store) => store.user);

  const { photoUrl, firstName } = loggedInUser || {};

  return (
    <Box sx={{ ...flexWithStart, alignItems: "flex-start", gap: '1.5rem' }}>
      <Avatar alt={firstName} src={photoUrl} sx={{ width: 72, height: 72 }} />
      <Box>
        <Typography
          variant="h6"
          component="h6"
          color="secondary"
          sx={{ fontWeight: "600" }}
        >
          Edit Your Profile
        </Typography>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            fontWeight: "300",
            color: mode === "light" ? "grey.700" : "grey.400",
            paddingTop: "0.3rem",
          }}
        >
          Update your information to help other developers connect with you
        </Typography>
      </Box>
    </Box>
  );
};

export { ProfileHeader };
