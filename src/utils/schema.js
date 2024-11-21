import * as Yup from "yup";


export const validationContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    number: Yup.string()
      .matches(/^\d{3}-\d{3}-\d{4}$/, "Enter in the format 123-456-7891")
      .required("Phone number is required"),
});
  
export const validationLofinSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email!")
      .required("Email is required"),
      password: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .matches(/[0-9]/, "Password should contain at least one number")
      .matches(/^[a-zA-Z0-9]*$/, "Password should not contain special characters")
      .required("Password is required"),
});

export const validationRegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name should be at least 2 characters")
    .max(50, "Name should be at most 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Must be a valid email!")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .matches(/[0-9]/, "Password should contain at least one number")
    .matches(/^[a-zA-Z0-9]*$/, "Password should not contain special characters")
    .required("Password is required"),
});
