import { Dispatch, SetStateAction } from "react"

export type AuthTabProps = {
    setTabValue: Dispatch<SetStateAction<"login" | "signup">>;
}