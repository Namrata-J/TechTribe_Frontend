import { Message } from "@/app/(private)/@modal/(...)chat/[id]/page.types";

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
