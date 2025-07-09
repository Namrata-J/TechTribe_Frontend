import React from "react";
import styles from "./connection.module.css";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { flexWithCenter, flexWithSpace, flexWithStart } from "@/utils/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { reviewConnectionRequest } from "@/redux/features/connectionRequest/connectionRequestSlice";

const ReceivedRequests = () => {
  const dispatch = useAppDispatch();
  const { requests } = useAppSelector((store) => store.user);

  return requests && requests.length > 0 ? (
    <Box
      className={styles.cardsWrapper}
      sx={{ ...flexWithCenter, width: { xs: "100%", sm: "90%" } }}
    >
      {requests.map((request) => (
        <Card
          key={request?.fromUserId?._id}
          className={styles.card}
          sx={{
            ...flexWithStart,
            width: { xs: "100%", sm: "30rem" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
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
            sx={{
              ...flexWithStart,
              padding: "0 !important",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                ...flexWithCenter,
                flexDirection: "column",
                alignItems: "flex-start",
                width: "50%",
              }}
            >
              <Typography
                color="secondary"
                variant="subtitle2"
                component="h6"
                sx={{ fontWeight: 600, lineHeight: "1.1rem" }}
              >
                {request?.fromUserId?.firstName} {request?.fromUserId?.lastName}
              </Typography>
              <Typography
                color="grey.600"
                variant="body1"
                component="div"
                className={styles.typography}
              >
                {request?.fromUserId?.profession}{" "}
                {request?.fromUserId?.company
                  ? `, ${request?.fromUserId.company}`
                  : ""}
              </Typography>
            </Box>
            <Box className={styles.btnWrapper} sx={flexWithSpace}>
              <Button
                variant="contained"
                color="secondary"
                className={styles.btn}
                onClick={() =>
                  dispatch(
                    reviewConnectionRequest({
                      status: "rejected",
                      requestId: request?._id,
                    })
                  )
                }
              >
                <Typography variant="body1">Reject</Typography>
              </Button>
              <Button variant="contained" className={styles.btn}>
                <Typography
                  variant="body1"
                  onClick={() =>
                    dispatch(
                      reviewConnectionRequest({
                        status: "accepted",
                        requestId: request?._id,
                      })
                    )
                  }
                >
                  Accept
                </Typography>
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  ) : (
    <Box sx={{ ...flexWithCenter, height: "100vh" }}>
      <Typography variant="subtitle1">
        No connection requests received
      </Typography>
    </Box>
  );
};

export { ReceivedRequests };
