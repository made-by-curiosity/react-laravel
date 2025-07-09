import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup
    .string()
    .email("Incorrect format. Please check entered email")
    .required("Enter email address"),
  password: yup
    .string()
    .required("Enter a password")
    .min(8, "Password must contain at least 8 characters")
});
