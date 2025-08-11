// RE for password ! important note: this is the only way to accept password from backend
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])[A-Za-z0-9@#$%^&+=]+$/;
const urlInputRegex =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const Regex = {
  emailRegex,
  passwordRegex,
  urlInputRegex,
};
