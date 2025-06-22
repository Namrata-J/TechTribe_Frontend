import React from "react";
import styles from "./connection.module.css";
import { useAppSelector } from "@/utils/hooks";
import { flexWithCenter, flexWithSpace, flexWithStart } from "@/utils/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const ReceivedRequests = () => {
  const { requests } = useAppSelector((store) => store.user);
  return requests && requests.length > 0 ? (
    <Box className={styles.cardsWrapper} sx={flexWithCenter}>
      {requests.map((request) => (
        <Card className={styles.card} sx={flexWithStart}>
          <Avatar
            alt={request?.fromUserId?.firstName}
            src={request?.fromUserId?.photoUrl}
            sx={{
              width: 36,
              height: 36,
            }}
          />
          <CardContent
            className={styles.cardContent}
            sx={{ ...flexWithStart, padding: "0 !important" }}
          >
            <Typography
              color="secondary"
              variant="subtitle2"
              component="h6"
              sx={{ fontWeight: 600, lineHeight: "1.1rem" }}
            >
              {request?.fromUserId?.firstName} {request?.fromUserId?.lastName}
            </Typography>
            <Typography color="grey.600" variant="body1" component="div">
              {request?.fromUserId?.profession}{" "}
              {request?.fromUserId?.company
                ? `, ${request?.fromUserId.company}`
                : ""}
            </Typography>
            <Box className={styles.btnWrapper} sx={flexWithSpace}>
              <Button
                variant="outlined"
                color="secondary"
                className={styles.btn}
              >
                Reject
              </Button>
              <Button variant="contained" className={styles.btn}>
                Accept
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  ) : (
    <Box sx={{ ...flexWithCenter, height: "100vh" }}>
      <Typography variant="subtitle1">No connections found</Typography>
    </Box>
  );
};

export { ReceivedRequests };
