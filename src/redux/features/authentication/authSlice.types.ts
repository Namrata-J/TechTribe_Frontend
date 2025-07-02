export interface AuthInitialState {
  userId: string | null;
  isUserLoggedIn: boolean | false;
  error: string;
  loading: boolean | false;
  userEmail: string | null
}

export interface loginHandlerPayload {
  userEmail: string;
  userPwd: string;
}

export interface signupHandlerPayload {
  firstName: string;
  userEmail: string;
  userPwd: string;
}

export interface verifyHandlerPayload {
  userEmail: string;
  otp: string;
}

export type AuthErrorPayload = {
  error?: string;
};
