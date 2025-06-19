import { AppDispatch } from "@/redux/app/store";
import { logoutHandler } from "@/redux/features/authentication/authSlice";

export const getCookie = (name: string): string | null => {
  const cookie = document?.cookie;
  const cookieArr = cookie.split(";").map((c) => c.trim());

  const reducerFunc = (acc: string | null, curr: string) => {
    if (!acc && curr.startsWith(`${name}=`)) {
      return decodeURIComponent(curr.substring(name.length + 1));
    }
    return acc;
  };

  const token = cookieArr.reduce<string | null>(reducerFunc, null);

  return token;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const handleAuthenticationFailure = (
  error: string,
  status: number,
  dispatch: AppDispatch
) => {
  if (error && [401, 404].includes(status)) {
    dispatch(logoutHandler());
    location.assign(`/auth?type=${status == 401 ? "login" : "signup"}`);
  }
};
