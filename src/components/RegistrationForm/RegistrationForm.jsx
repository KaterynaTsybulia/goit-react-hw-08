import { Field, Form, Formik, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { validationRegistrationSchema } from "../../utils/schema";
import { register } from "../../redux/auth/operations";

import css from "./RegistrationForm.module.css";

export const RegistrationForm = () => {
  const dispatch = useDispatch();

  const initialValues = { name: "", email: "", password: "" };

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(register(values)).unwrap();
      toast.success("Success register!");
      actions.resetForm();
    } catch (error) {
      if (error === "Request failed with status code 400") {
        toast.error("User with this e-mail already exists.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationRegistrationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>Name</label>
        <Field
          type="text"
          name="name"
          placeholder="Adrian Cross"
          className={css.input}
        />
        <ErrorMessage name="name" component="span" className={css.error} />

        <label className={css.label}>Email</label>
        <Field
          type="text"
          name="email"
          placeholder="across@gmail.com"
          className={css.input}
        />
        <ErrorMessage name="email" component="span" className={css.error} />

        <label className={css.label}>Password</label>
        <Field
          type="password"
          name="password"
          className={css.input}
          placeholder="examplepwd12345"
        />
        <ErrorMessage name="password" component="span" className={css.error} />

        <button type="submit" className={css.button}>
          Sign Up
        </button>
      </Form>
    </Formik>
  );
};
