import { Dispatch, SetStateAction } from "react"
import { SignUpStepType } from "../authModal.types";

export type AuthTabProps = {
    setTabValue: Dispatch<SetStateAction<"login" | "signup">>;
    setSignupStep: Dispatch<SetStateAction<SignUpStepType>>
}