import * as yup from "yup";

export const validationSchema = yup.object({
  title: yup
    .string()
    .required("Enter your Full Name"),
  content: yup
    .string()
    .required("Enter a password")
});
