export const AUTH_FIELDS = {
  FIRST_NAME: "FIRST_NAME",
  EMAIL_ID: "EMAIL_ID",
  AUTH_PWD: "AUTH_PWD",
} as const;

export const PROFILE_EDIT_FORM_SECTIONS = {
  BASIC_INFORMATION: "Basic Information",
  PROFESSIONAL_INFORMATION: "Professional Information",
  SKILLS: "Skills",
  ABOUT: "About",
  INTERESTS: "Interests",
} as const;

export const PROFILE_EDIT_FORM_FIELDS = {
  FIRST_NAME: "First Name",
  LAST_NAME: "Last Name",
  EMAIL: "Email",
  LOCATION: "Location",
  PHOTO: "Photo",
  GENDER: "Gender",
  PROFESSION: "Profession",
  COMPANY: "Company",
  EXPERIENCE_LEVEL: "Experience level",
  SKILLS: "Skills",
  ABOUT: "About",
  LOOKING_FOR: "Looking For",
} as const;

export const FIELD_TO_USER_KEY_MAP = {
  [PROFILE_EDIT_FORM_FIELDS.FIRST_NAME]: "firstName",
  [PROFILE_EDIT_FORM_FIELDS.LAST_NAME]: "lastName",
  [PROFILE_EDIT_FORM_FIELDS.LOCATION]: "location",
  [PROFILE_EDIT_FORM_FIELDS.PROFESSION]: "profession",
  [PROFILE_EDIT_FORM_FIELDS.COMPANY]: "company",
  [PROFILE_EDIT_FORM_FIELDS.EXPERIENCE_LEVEL]: "expererienceLevel",
  [PROFILE_EDIT_FORM_FIELDS.SKILLS]: "skills",
  [PROFILE_EDIT_FORM_FIELDS.ABOUT]: "about",
  [PROFILE_EDIT_FORM_FIELDS.LOOKING_FOR]: "lookingFor",
  [PROFILE_EDIT_FORM_FIELDS.PHOTO]: "photoUrl",
  [PROFILE_EDIT_FORM_FIELDS.GENDER]: "gender",
} as const;

export const BASE_URL = "/api";
