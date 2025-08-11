export const Logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/sign-in";
};
