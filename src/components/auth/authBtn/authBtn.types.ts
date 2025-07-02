import { Dispatch, SetStateAction } from "react";
import { SignUpStepType } from "../authModal.types";
import { TextFieldInfo } from "../authTextFields/authTextFields.types";

export type AuthBtnProps = {
    tabValue: 'login' | 'signup';
    signupStep: SignUpStepType;
    textFieldInfo: TextFieldInfo;
    setSignupStep: Dispatch<SetStateAction<SignUpStepType>>
}