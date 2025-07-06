type Message = {
    senderId: string,
    senderFirstName: string,
    text: string
};

export type MessagesList = Message[];

export type ReceiverMessageProps = {
  senderId: string;
  senderFirstName: string;
  senderMessage: string;
};
