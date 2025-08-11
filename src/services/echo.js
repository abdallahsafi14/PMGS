import Echo from "laravel-echo";
import Pusher from "pusher-js";
import environment from "../environment"; // Adjust path as needed

window.Pusher = Pusher;

// Function to get fresh token
const getToken = () => localStorage.getItem("token");

const echo = new Echo({
  broadcaster: "pusher",
  key: environment.PUSHER_APP_KEY,
  cluster: "mt1", // required by Pusher, dummy is fine for soketi
  wsHost: environment.VITE_SOKETI_HOST,
  wsPort: parseInt(environment.VITE_SOKETI_PORT, 10) || 6001,
  forceTLS: false,
  encrypted: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  authEndpoint: `https://84.247.136.18/broadcasting/auth`, // Hardcoded full URL
  auth: {
    headers: {
      Authorization: () => `Bearer ${getToken()}`, // Dynamic token retrieval
    },
  },
});

export default echo;
