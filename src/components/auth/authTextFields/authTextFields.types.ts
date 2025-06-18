import { AUTH_FIELDS } from "@/utils/constants";
import { Dispatch, SetStateAction } from "react";

type AuthFieldKeys = keyof typeof AUTH_FIELDS;
type AuthFieldsIds = (typeof AUTH_FIELDS)[AuthFieldKeys];

type FieldInfo = {
  value: string;
  helperText: string;
  error: boolean;
};

export type TextFieldInfo = {
  [key in AuthFieldsIds]: FieldInfo;
};

export type AuthTextFieldsProps = {
  tabValue: "login" | "signup";
  textFieldInfo: TextFieldInfo;
  setTextFieldInfo: Dispatch<SetStateAction<TextFieldInfo>>;
};
