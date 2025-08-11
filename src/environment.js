const config = {
  //API ENDPOINTS
  AUTH_ENDPOINT: "Auth",

  //LOCAL STORAGE KEYS
  TOKEN_KEY: "token",
  REFRESH_TOKEN_KEY: "refreshToken",
  DIRECTION_KEY: "dir",

  //CONSTANT
  API_KEY: "",

  // API Configuration
  API_URL: "http://84.247.136.18", // Base API URL

  // Soketi/Pusher Configuration
  VITE_SOKETI_HOST: "84.247.136.18",
  VITE_SOKETI_PORT: "6001",
  PUSHER_APP_KEY: "app-key",
};

const environment = {
  ...config,
};

export default environment;
