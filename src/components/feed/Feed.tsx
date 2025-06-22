"use client";

import styles from "./feed.module.css";
import { useAppSelector } from "@/utils/hooks";
import { flexWithCenter, flexWithSpace } from "@/utils/styles";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const Feed = () => {
  const { feed } = useAppSelector((store) => store.user);

  return (
    <Box className={styles.feed} sx={flexWithCenter}>
      {feed.map((user, index) => (
        <Card
          key={user?._id}
          className={styles.card}
          sx={{
            ...flexWithCenter,
            borderRadius: "0.5rem",
            display: index != 0 ? "none" : "flex",
          }}
        >
          <Avatar
            alt={user?.firstName}
            src={user?.photoUrl}
            sx={{
              width: 56,
              height: 56,
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          />
          <CardContent
            className={styles.cardContent}
            sx={{ ...flexWithCenter, padding: 0 }}
          >
            <Box className={styles.basicInformation} sx={flexWithCenter}>
              <Typography
                color="secondary"
                variant="subtitle1"
                component="h6"
                sx={{ fontWeight: 600, lineHeight: "1.1rem" }}
              >
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography color="grey.600" variant="body2" component="div">
                {user?.profession} {user?.company ? `, ${user.company}` : ""}
              </Typography>
              <Typography color="grey.500" variant="body1" component="div">
                {user?.expererienceLevel
                  ? `Experience: ${user?.expererienceLevel} years`
                  : ""}
              </Typography>
            </Box>
            {user?.skills && user?.skills.length > 0 && (
              <Box className={styles.skillsWrapper}>
                <Typography
                  color="secondary"
                  variant="body2"
                  component="div"
                  sx={{ fontWeight: "600" }}
                  className={styles.skillsHeading}
                >
                  Skills
                </Typography>
                <Stack direction="row" spacing={1}>
                  {user?.skills?.map((chip) => (
                    <Chip
                      key={chip}
                      label={chip}
                      variant="outlined"
                      color="primary"
                      sx={{
                        "&.MuiChip-root": {
                          height: "1.8rem",
                          fontSize: "0.7rem",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
            {user?.about && (
              <Box className={styles.aboutWrapper}>
                <Typography
                  color="secondary"
                  variant="body2"
                  component="div"
                  sx={{ fontWeight: "600" }}
                  className={styles.aboutHeading}
                >
                  About
                </Typography>
                <Typography variant="body1" color="grey.600">
                  {user?.about}
                </Typography>
              </Box>
            )}
            {user?.lookingFor && (
              <Box className={styles.lookingForWrapper}>
                <Typography
                  color="secondary"
                  variant="body2"
                  component="div"
                  sx={{ fontWeight: "600" }}
                  className={styles.aboutHeading}
                >
                  Looking For
                </Typography>
                <Chip
                  label={user?.lookingFor}
                  variant="outlined"
                  color="primary"
                  sx={{
                    "&.MuiChip-root": {
                      height: "1.8rem",
                      fontSize: "0.7rem",
                    },
                  }}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
      <CardActions sx={{ ...flexWithSpace, width: "15rem" }}>
        <IconButton
          sx={{
            "&:hover": {
              color: "error.main",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          sx={{
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <DoneIcon />
        </IconButton>
      </CardActions>
    </Box>
  );
};

export { Feed };
