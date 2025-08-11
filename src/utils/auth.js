import environment from "../environment";

export const token = localStorage.getItem(environment.TOKEN_KEY);
export const isLoggedIn = () => {
  return token?.length > 0;
};
