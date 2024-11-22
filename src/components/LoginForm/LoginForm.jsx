import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "../../redux/auth/operations";
import { validationLofinSchema } from "../../utils/schema";

import css from "./LoginForm.module.css";

export const LoginForm = () => {
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const dispatch = useDispatch();

  const INITIAL_VALUES = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(loginUser(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationLofinSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label htmlFor={emailFieldId} className={css.label}>
          E-mail
        </label>
        <Field
          type="text"
          id={emailFieldId}
          name="email"
          placeholder="across@gmail.com"
          className={css.input}
        />
        <ErrorMessage name="email" component="span" className={css.error} />

        <label htmlFor={passwordFieldId} className={css.label}>
          Password
        </label>
        <Field
          type="password"
          id={passwordFieldId}
          name="password"
          className={css.input}
          placeholder="examplepwd12345"
        />
        <ErrorMessage name="password" component="span" className={css.error} />

        <button type="submit" className={css.button}>
          Log In
        </button>
      </Form>
    </Formik>
  );
};
