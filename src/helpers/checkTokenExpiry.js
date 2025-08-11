export const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  if (!token) return true;

  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (e) {
    return true; // malformed token
  }
};
