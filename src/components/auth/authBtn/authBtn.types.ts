import { TextFieldInfo } from "../authTextFields/authTextFields.types";

export type AuthBtnProps = {
    tabValue: 'login' | 'signup';
    textFieldInfo: TextFieldInfo
}