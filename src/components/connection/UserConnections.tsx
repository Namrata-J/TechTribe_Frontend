import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./connection.module.css";
import { useAppSelector } from "@/utils/hooks";
import { flexWithCenter, flexWithStart, flexWithSpace } from "@/utils/styles";

const UserConnections = () => {
  const router = useRouter();
  const { connections } = useAppSelector((store) => store.user);

  return connections && connections.length > 0 ? (
    <Box className={styles.cardsWrapper} sx={{...flexWithCenter, width: { xs: '100%', sm: '90%'}}}>
      {connections.map((connection) => (
        <Card
          key={connection?._id}
          className={styles.card}
          sx={{
            ...flexWithStart,
            width: { xs: '100%', sm: '30rem'},
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          }}
        >
          <Avatar
            alt={connection?.firstName}
            src={connection?.photoUrl}
            sx={{
              width: 40,
              height: 40,
            }}
          />
          <CardContent
            sx={{ ...flexWithSpace, padding: "0 !important", width: "100%" }}
          >
            <Box className={styles.cardContentTypography} sx={flexWithStart}>
              <Typography
                color="secondary"
                variant="subtitle2"
                component="h6"
                sx={{ fontWeight: 600, lineHeight: "1.1rem" }}
              >
                {connection?.firstName} {connection?.lastName}
              </Typography>
              <Typography color="grey.600" variant="body1" component="div">
                {connection?.profession}{" "}
                {connection?.company ? `, ${connection.company}` : ""}
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                padding: "0.2rem 0.8rem",
                minWidth: "auto",
                boxShadow: "none",
              }}
              onClick={() => router.push(`/chat/${connection._id}`)}
            >
              Chat
            </Button>
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

export { UserConnections };
