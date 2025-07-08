"use client";

import {
  Avatar,
  Box,
  Divider,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import io from "socket.io-client";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { BASE_URL } from "@/utils/constants";
import { getCookie } from "@/utils/authUtils";
import { useAppSelector } from "@/utils/hooks";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useRef, useState } from "react";
import { Message, MessagesList } from "./page.types";
import { useTheme } from "@/app/_theme/ThemeRegistery";
import { loggedInUser } from "@/redux/features/user/userSlice.types";
import { flexWithCenter, flexWithSpace, flexWithStart } from "@/utils/styles";
import PrivateConnectivityRoundedIcon from "@mui/icons-material/PrivateConnectivityRounded";

const ChatModal = () => {
  const { mode } = useTheme();
  const { id: connectionId } = useParams();
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [textInput, setTextInput] = useState<string>("");
  const [messagesList, setMessagesList] = useState<MessagesList>([]);
  const [connection, setConnection] = useState<loggedInUser | undefined>();
  const { loggedInUser, connections } = useAppSelector((store) => store.user);

  const { photoUrl } = loggedInUser || {};

  const createSocketConnection = () => {
    const socket = io(BASE_URL, { auth: { token: getCookie("token") } });
    return socket;
  };

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      receiverId: connectionId,
      senderMessage: textInput,
    });
  };

  useEffect(() => {
    if (!loggedInUser) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      receiverId: connection?._id,
    });

    socket.on(
      "receiveMessage",
      ({ messageId, message, senderId, date, time }: Message) => {
        setMessagesList((prevMessages) => [
          ...prevMessages,
          {
            messageId,
            message,
            senderId,
            date,
            time,
          },
        ]);
      }
    );

    socket.on("connect_error", (err) => {
      if (
        err?.message === "Authentication error" ||
        err?.message === "User not found"
      ) {
        location.assign("/auth?type=login&invalid=true");
      }
      socket.disconnect();
    });

    return () => {
      socket.disconnect();
    };
  }, [loggedInUser, connection]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesList]);

  useEffect(() => {
    const receiver = connections.find(
      (connection) => connection._id === connectionId
    );

    setConnection(receiver);
  }, []);

  return (
    <Modal
      open={true}
      sx={flexWithCenter}
      // onClose={() => {}}
    >
      <Paper
        className={styles.modal}
        elevation={8}
        sx={{
          ...flexWithSpace,
          "&.MuiPaper-root": {
            borderRadius: "0.4rem",
            ...(mode === "light"
              ? { backgroundColor: "background.default" }
              : {}),
          },
        }}
      >
        <Box className={styles.header} sx={flexWithStart}>
          <Box sx={flexWithCenter}>
            <Avatar src={photoUrl} sx={{ width: 28, height: 28 }} />
            <PrivateConnectivityRoundedIcon sx={{ fontSize: "1.8rem" }} />
            <Avatar src={connection?.photoUrl} sx={{ width: 28, height: 28 }} />
          </Box>
          <Typography variant="subtitle1" className={styles.title}>
            Private Chat Room
          </Typography>
        </Box>
        <Divider />
        <Box className={styles.chatArea} sx={flexWithStart}>
          {messagesList &&
            messagesList?.length > 0 &&
            messagesList.map((message, _i) => {
              const isSenderMe = message?.senderId === loggedInUser?._id;
              const isNextMsgSenderSameAsPrevOne =
                messagesList[_i + 1] &&
                messagesList[_i + 1]?.senderId === message?.senderId;
              const isNextSameSenderHasSameTime =
                isNextMsgSenderSameAsPrevOne &&
                messagesList[_i + 1]?.time === message?.time;

              return (
                <Box
                  key={message?.messageId}
                  className={styles.message}
                  sx={{
                    ...flexWithStart,
                    alignItems: "flex-end",
                    flexDirection: isSenderMe ? "row-reverse" : "row",
                    width: "100%",
                    marginBottom:
                      isNextMsgSenderSameAsPrevOne || !messagesList[_i + 1]
                        ? "0"
                        : "1.5rem",
                  }}
                >
                  <Avatar
                    src={isSenderMe ? photoUrl : connection?.photoUrl}
                    sx={{
                      width: 18,
                      height: 18,
                      visibility: isNextMsgSenderSameAsPrevOne
                        ? "hidden"
                        : "visible",
                      marginBottom: "0.9rem",
                    }}
                  />
                  <Box ref={chatAreaRef}>
                    <Typography
                      variant="body2"
                      className={`${styles.messageText} ${
                        isNextMsgSenderSameAsPrevOne
                          ? ""
                          : isSenderMe
                          ? styles.rightMsg
                          : styles.leftMsg
                      }`}
                      sx={{
                        color:
                          mode === "light" && isSenderMe
                            ? "background.paper"
                            : "",
                        backgroundColor: isSenderMe
                          ? "accent.main"
                          : mode === "light"
                          ? "grey.300"
                          : "grey.700",
                      }}
                    >
                      {message?.message}
                    </Typography>
                    {!isNextSameSenderHasSameTime && (
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{
                          fontSize: "0.55rem",
                          paddingTop: "0.1rem",
                          textAlign: isSenderMe ? "right" : "left",
                        }}
                      >
                        {message?.time}
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
        </Box>
        <Divider />
        <Box className={styles.footer}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                background: (theme) =>
                  mode === "light"
                    ? theme.palette.grey[300]
                    : theme.palette.grey[800],
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
            }}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <SendIcon
            sx={{
              "&:hover": {
                color: "primary.main",
                cursor: "pointer",
              },
            }}
            onClick={() => {
              setTextInput("");
              sendMessage();
            }}
          />
        </Box>
      </Paper>
    </Modal>
  );
};

export default ChatModal;
