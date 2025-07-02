import { AUTH_FIELDS } from "@/utils/constants";

export type AuthFieldsKey = keyof typeof AUTH_FIELDS;

type AuthField = {
  value: string;
  helperText: string;
  error: boolean;
};

export type TextFieldInfoType = {
  [key in AuthFieldsKey]: AuthField;
};

export type SignUpStepType = 1 | 2;