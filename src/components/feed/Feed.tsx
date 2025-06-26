"use client";

import styles from "./feed.module.css";
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
import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { flexWithCenter, flexWithSpace } from "@/utils/styles";
import { fetchUserFeed } from "@/redux/features/user/userSlice";
import { sendConnectionRequest } from "@/redux/features/connectionRequest/connectionRequestSlice";

const Feed = () => {
  const dispatch = useAppDispatch();
  const { feed } = useAppSelector((store) => store.user);
  const [page, setPage] = useState(1);
  const [hasMoreUsersLeftInFeed, setHasMoreUsersLeftInFeed] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchFeed = () => {
    if (feed?.length <= 1 && hasMoreUsersLeftInFeed) {
      let limit = 5;
      dispatch(fetchUserFeed({ page, limit })).then((res) => {
        if (res.payload && res.payload?.length < limit) {
          setHasMoreUsersLeftInFeed(false);
        } else {
          if(!initialLoad) {
            setPage((page) => page + 1);
          }else {
            setInitialLoad(false)
          }
        }
      });
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return feed && feed.length > 0 ? (
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
          onClick={() => {
            dispatch(
              sendConnectionRequest({
                status: "ignored",
                userId: feed[0]._id as string,
              })
            ).then((res) => {
              if (res.payload) {
                fetchFeed();
              }
            });
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
          onClick={() => {
            dispatch(
              sendConnectionRequest({
                status: "interested",
                userId: feed[0]._id as string,
              })
            ).then((res) => {
              if (res.payload) {
                fetchFeed();
              }
            });
          }}
        >
          <DoneIcon />
        </IconButton>
      </CardActions>
    </Box>
  ) : (
    <Box className={styles.feed} sx={flexWithCenter}>
      <Typography variant="subtitle1">No users to connect</Typography>
    </Box>
  );
};

export { Feed };
