import { Message } from "@/components/chat/chat.types";

export type chatInitialState = {
  messagesList: Message[];
  loading: boolean;
  error: string;
  status: number;
};

export type ChatErrorPayload = {
  error: string;
  status?: number;
};
