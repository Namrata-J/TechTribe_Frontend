import { PROFILE_EDIT_FORM_SECTIONS } from "@/utils/constants";

type ProfileEditFormField = {
  value: string | string[];
  helperText: string;
  error: boolean;
  disable?: boolean;
  type: string;
  options?: string[];
  input?: string
};

type ProfileEditFormSectionFields = Record<string, ProfileEditFormField>;

export type ProfileEditFormSection = keyof typeof PROFILE_EDIT_FORM_SECTIONS;

export type ProfileEditFormType = {
  [key in ProfileEditFormSection]: ProfileEditFormSectionFields;
};
