import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../helpers/checkTokenExpiry";
import { Logout } from "../helpers/logout";
import { errorToaster } from "../helpers/toasterConfiguration";

export const handleError = (error) => {
  // const navigate = useNavigate();
  const status = error?.status;

  if (status === 400) {
    error?.data?.errors?.forEach((err) => {
      // errorToaster(err?.message);
    });
  } else if (status === 401) {
    // store.dispatch(setSessionEnd(true));

    // Token may have expired → redirect to login
    if (isTokenExpired()) {
      localStorage.removeItem("token");
      window.location.href = "/sign-in";
    }

    Logout();
  } else if (status === 404) {
    window.location.href = "/error";
  } else if (status === 403) {
    errorToaster(error?.data.message);
    window.history.back();
  } else if (status === 423) {
    // store.dispatch(setDisabledAccount(true));
  } else if (status === 428) {
    // store.dispatch(setSessionEnd(true));
  } else if (status === 500) {
    // errorToaster(error?.data?.errors[0]?.message);
  }
};
