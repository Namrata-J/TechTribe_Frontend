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
