import React from "react";
import { Chat } from "@/components/chat/Chat";

const ChatModal = () => {
  console.log("🚀 ~ ChatModal rendered");
  return <Chat isModal={true} />;
};

export default ChatModal;
