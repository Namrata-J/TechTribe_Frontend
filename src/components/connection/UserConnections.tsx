import React from "react";
import styles from "./connection.module.css";
import { useAppSelector } from "@/utils/hooks";
import { flexWithCenter, flexWithStart } from "@/utils/styles";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";

const UserConnections = () => {
  const { connections } = useAppSelector((store) => store.user);

  return connections && connections.length > 0 ? (
    <Box className={styles.cardsWrapper} sx={flexWithCenter}>
      {connections.map((connection) => (
        <Card className={styles.card} sx={flexWithStart}>
          <Avatar
            alt={connection?.firstName}
            src={connection?.photoUrl}
            sx={{
              width: 24,
              height: 24,
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
              {connection?.firstName} {connection?.lastName}
            </Typography>
            <Typography color="grey.600" variant="body1" component="div">
              {connection?.profession}{" "}
              {connection?.company ? `, ${connection.company}` : ""}
            </Typography>
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
