import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import {
  FIELD_TO_USER_KEY_MAP,
  PROFILE_EDIT_FORM_FIELDS,
  PROFILE_EDIT_FORM_SECTIONS,
} from "@/utils/constants";
import {
  ProfileEditFormSection,
  ProfileEditFormType,
} from "./profileEditForm.types";
import validator from "validator";
import { styled } from "@mui/material/styles";
import { flexWithCenter } from "@/utils/styles";
import styles from "./profileEditForm.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { loggedInUser } from "@/redux/features/user/userSlice.types";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { updateLoggedInUserDetails } from "@/redux/features/user/userSlice";

const StyledAddIcon = styled(AddCircleTwoToneIcon)(({ theme }) => ({
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const ProfileEditForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const isNewUser = searchParams.get("new") === "true";
  const { loggedInUser } = useAppSelector((store) => store.user);
  const [editFormFields, setEditFormFields] = useState<ProfileEditFormType>(
    {} as ProfileEditFormType
  );
  const [disableSaveBtn, setDisableSaveBtn] = useState(true);
  const [isChangesMade, setIsChangesMade] = useState(false);
  const {
    skills,
    about,
    photoUrl,
    firstName,
    lastName,
    email,
    gender,
    location,
    profession,
    company,
    lookingFor,
    expererienceLevel,
  } = loggedInUser || {};

  useEffect(() => {
    if (loggedInUser) {
      const editFormFieldsList = {
        BASIC_INFORMATION: {
          [PROFILE_EDIT_FORM_FIELDS.FIRST_NAME]: {
            value: firstName || "",
            helperText: "",
            error: false,
            type: "text",
          },
          [PROFILE_EDIT_FORM_FIELDS.LAST_NAME]: {
            value: lastName || "",
            helperText: "",
            error: false,
            type: "text",
          },
          [PROFILE_EDIT_FORM_FIELDS.EMAIL]: {
            value: email || "",
            helperText: "",
            error: false,
            disable: true,
            type: "email",
          },
          [PROFILE_EDIT_FORM_FIELDS.LOCATION]: {
            value: location || "",
            helperText: "",
            error: false,
            type: "text",
          },
          [PROFILE_EDIT_FORM_FIELDS.PHOTO]: {
            value: photoUrl || "",
            helperText: "",
            error: false,
            type: "text",
          },
          [PROFILE_EDIT_FORM_FIELDS.GENDER]: {
            value: gender || "",
            helperText: "",
            error: false,
            type: "select",
            options: ["male", "female", "others"],
          },
        },
        PROFESSIONAL_INFORMATION: {
          [PROFILE_EDIT_FORM_FIELDS.PROFESSION]: {
            value: profession || "",
            helperText: "",
            error: false,
            type: "text",
          },
          [PROFILE_EDIT_FORM_FIELDS.COMPANY]: {
            value: company || "",
            helperText: "",
            error: false,
            type: "text",
          },
          [PROFILE_EDIT_FORM_FIELDS.EXPERIENCE_LEVEL]: {
            value: expererienceLevel || "",
            helperText: "",
            error: false,
            type: "select",
            options: ["0-3", "3-5", ">5"],
          },
        },
        SKILLS: {
          [PROFILE_EDIT_FORM_FIELDS.SKILLS]: {
            value: skills || [],
            helperText: "",
            error: false,
            type: "chip",
            input: "",
          },
        },
        ABOUT: {
          [PROFILE_EDIT_FORM_FIELDS.ABOUT]: {
            value: about || "My Bio",
            helperText: "",
            error: false,
            type: "textarea",
          },
        },
        INTERESTS: {
          [PROFILE_EDIT_FORM_FIELDS.LOOKING_FOR]: {
            value: lookingFor || "",
            helperText: "",
            error: false,
            type: "radio",
            options: [
              "Project Collaboration",
              "Mentorship",
              "Networking",
              "Job Opportunities",
            ],
          },
        },
      };

      setIsChangesMade(false);
      setEditFormFields(editFormFieldsList);
      setDisableSaveBtn(true);
    }
  }, [loggedInUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: ProfileEditFormSection,
    field: string
  ) => {
    // for text, textarea, select and radio fields
    let value = e?.target?.value;
    let helperText = "";
    let error = false;
    let trimmedValue = value.trim();
    let isExperienceLevelFieldMandatory = false;

    if (
      field === PROFILE_EDIT_FORM_FIELDS.FIRST_NAME ||
      field === PROFILE_EDIT_FORM_FIELDS.PHOTO
    ) {
      if (trimmedValue.length == 0) {
        helperText = "This field is mandatory";
        error = true;
      } else if (
        field === PROFILE_EDIT_FORM_FIELDS.FIRST_NAME &&
        (trimmedValue.length < 2 || trimmedValue.length > 50)
      ) {
        helperText = "Name should be >2 characters and <50 characters";
        error = true;
      } else if (
        field === PROFILE_EDIT_FORM_FIELDS.PHOTO &&
        !validator.isURL(trimmedValue)
      ) {
        helperText = "Enter a valid photo URL";
        error = true;
      }
    } else if (field === PROFILE_EDIT_FORM_FIELDS.PROFESSION) {
      if (
        trimmedValue.length > 0 &&
        editFormFields[section][PROFILE_EDIT_FORM_FIELDS.EXPERIENCE_LEVEL].value
          .length == 0
      ) {
        isExperienceLevelFieldMandatory = true;
      }
    }

    setEditFormFields((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: {
          ...prevState[section][field],
          value,
          helperText,
          error,
        },
        ...(field === PROFILE_EDIT_FORM_FIELDS.PROFESSION
          ? {
              [PROFILE_EDIT_FORM_FIELDS.EXPERIENCE_LEVEL]: {
                ...prevState[section][
                  PROFILE_EDIT_FORM_FIELDS.EXPERIENCE_LEVEL
                ],
                helperText: isExperienceLevelFieldMandatory
                  ? "This field is mandatory"
                  : "",
                error: isExperienceLevelFieldMandatory,
              },
            }
          : []),
      },
    }));

    if (!isChangesMade) {
      setIsChangesMade(true);
    }
  };

  const handleSkillsInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: ProfileEditFormSection,
    field: string
  ) => {
    const inputValue = e.target.value;

    setEditFormFields((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: {
          ...prevState[section][field],
          input: inputValue,
        },
      },
    }));

    if (!isChangesMade) {
      setIsChangesMade(true);
    }
  };

  const handleChipsAction = (
    type: string,
    section: ProfileEditFormSection,
    field: string,
    chipVal?: string
  ) => {
    if (editFormFields[section][field]?.input?.length == 0) {
      return;
    }
    switch (type) {
      case "ADD": {
        setEditFormFields((prevState) => ({
          ...prevState,
          [section]: {
            ...prevState[section],
            [field]: {
              ...prevState[section][field],
              value: prevState[section][field]?.value.includes(
                prevState[section][field]?.input as string
              )
                ? prevState[section][field]?.value
                : [
                    ...prevState[section][field]?.value,
                    prevState[section][field]?.input,
                  ],
              input: "",
            },
          },
        }));
        break;
      }
      case "DELETE": {
        setEditFormFields((prevState) => ({
          ...prevState,
          [section]: {
            ...prevState[section],
            [field]: {
              ...prevState[section][field],
              value: (prevState[section][field]?.value as string[]).filter(
                (chip) => chip !== chipVal
              ),
              input: "",
            },
          },
        }));
        break;
      }
      default:
        break;
    }

    if (!isChangesMade) {
      setIsChangesMade(true);
    }
  };

  const disableBtn = () => {
    const shouldDisable = (
      Object.keys(PROFILE_EDIT_FORM_SECTIONS) as ProfileEditFormSection[]
    ).some((section) => {
      const fields = editFormFields[section];
      if (!fields) return false;

      return Object.values(fields).some((fieldConfig) => fieldConfig.error);
    });

    setDisableSaveBtn(shouldDisable);
  };

  const handleSaveBtnClick = () => {
    const data: Record<string, any> = {};

    for (const section in editFormFields) {
      const sectionFields = editFormFields[section as ProfileEditFormSection];
      for (const field in sectionFields) {
        const value = sectionFields[field].value;
        data[field] = value;
      }
    }

    const userData = {} as Partial<loggedInUser>;

    for (const field in FIELD_TO_USER_KEY_MAP) {
      const key =
        FIELD_TO_USER_KEY_MAP[field as keyof typeof FIELD_TO_USER_KEY_MAP];
      if (data[field] && data[field]?.length > 0) {
        userData[key] = data[field];
      }
    }

    dispatch(updateLoggedInUserDetails(userData))
      .unwrap()
      .then((res) => {
        if (isNewUser && res?._id) {
          router.push("/feed");
        }
      });
  };

  useEffect(() => {
    if (isChangesMade) {
      disableBtn();
    }
  }, [editFormFields]);

  return (
    <Box className={styles.form} sx={flexWithCenter}>
      {(
        Object.keys(PROFILE_EDIT_FORM_SECTIONS) as ProfileEditFormSection[]
      ).map((section, _i) => (
        <Box key={_i} className={styles.formSection}>
          <Typography
            variant="subtitle1"
            component="h6"
            color="secondary"
            sx={{ fontWeight: "500", marginBottom: "1rem" }}
          >
            {PROFILE_EDIT_FORM_SECTIONS[section]}
          </Typography>
          {editFormFields[section] && (
            <Box className={styles.fieldsWrapper}>
              {Object.keys(editFormFields[section]).map((field) => {
                const editFormFieldSection = editFormFields[section];
                const editFormField = editFormFieldSection[field];
                return editFormField?.type === "select" &&
                  editFormField?.options ? (
                  <TextField
                    key={field}
                    className={styles.textField}
                    label={field}
                    helperText={editFormField?.helperText}
                    id={field}
                    error={editFormField?.error}
                    select
                    value={editFormField?.value}
                    onChange={(e) => handleChange(e, section, field)}
                  >
                    {editFormField?.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : editFormField?.type === "chip" ? (
                  <Box key={field} className={styles.chipInput}>
                    <TextField
                      label={field}
                      variant="outlined"
                      type="text"
                      value={editFormField?.input}
                      onChange={(e) =>
                        handleSkillsInputChange(e, section, field)
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <StyledAddIcon
                              onClick={() =>
                                handleChipsAction("ADD", section, field)
                              }
                            />
                          </InputAdornment>
                        ),
                      }}
                      error={editFormField?.error}
                      helperText={editFormField?.helperText}
                    />
                    {editFormField?.value?.length > 0 && (
                      <Box className={styles.chipsWrapper}>
                        {(editFormField?.value as string[]).map((chip) => (
                          <Chip
                            key={chip}
                            color="primary"
                            variant="outlined"
                            label={chip}
                            onDelete={() =>
                              handleChipsAction("DELETE", section, field, chip)
                            }
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                ) : editFormField?.type === "radio" ? (
                  editFormField?.options && (
                    <FormControl key={field}>
                      <FormLabel id={field}>{field}</FormLabel>
                      <RadioGroup
                        aria-labelledby={field}
                        name={field}
                        value={editFormField?.value}
                        onChange={(e) => handleChange(e, section, field)}
                      >
                        {editFormField?.options.map((option) => (
                          <FormControlLabel
                            key={option}
                            value={option}
                            control={<Radio />}
                            label={option}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  )
                ) : (
                  <TextField
                    key={field}
                    className={
                      editFormField?.type === "textarea"
                        ? styles.textarea
                        : styles.textField
                    }
                    label={field}
                    multiline={
                      editFormField?.type === "textarea" ? true : false
                    }
                    helperText={editFormField?.helperText}
                    maxRows={6}
                    id={field}
                    error={editFormField?.error}
                    type={editFormField?.type}
                    disabled={editFormField?.disable}
                    sx={{
                      "&.MuiTextField-root": {
                        width: "100%",
                      },
                      "& .Mui-disabled": {
                        opacity: "0.5",
                      },
                    }}
                    value={editFormField?.value}
                    onChange={(e) => handleChange(e, section, field)}
                  />
                );
              })}
            </Box>
          )}
        </Box>
      ))}
      <Box className={styles.btnWrapper} sx={{}}>
        <Button
          disabled={disableSaveBtn}
          variant="contained"
          onClick={handleSaveBtnClick}
        >
          {isNewUser ? "Next" : "Save"}
        </Button>
      </Box>
    </Box>
  );
};

export { ProfileEditForm };
