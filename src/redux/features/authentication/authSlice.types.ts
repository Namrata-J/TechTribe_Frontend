export interface AuthInitialState {
  userId: string | null;
  encodedToken: string | null;
  isUserLoggedIn: boolean | false;
  error: string;
  loading: boolean | false;
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