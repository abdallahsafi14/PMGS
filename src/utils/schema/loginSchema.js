import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    // .matches(
    //   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    //   "Invalid email address"
    // )
    .required("Required"),

  password: Yup.string()
    // .min(8, "Password must be at least 8 characters")
    // .matches(/[0-9]/, "Password must contain at least one number")
    // .matches(
    //   /[!@#$%^&*(),.?":{}|<>]/,
    //   "Password must contain at least one special character"
    // )
    // .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .required("Required"),
    remember_me: Yup.boolean(),
});
