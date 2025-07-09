import * as yup from "yup";

export const validationSchema = yup.object({
  title: yup
    .string()
    .required("Enter a title"),
  content: yup
    .string()
    .required("Enter a content"),
});
