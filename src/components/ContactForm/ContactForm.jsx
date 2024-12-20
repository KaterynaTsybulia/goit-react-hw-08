import { useDispatch } from "react-redux";
import { useId } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import MaskedInput from "react-text-mask";

import { addContact } from "../../redux/contacts/operations";
import { validationContactSchema } from "../../utils/schema";

import css from "./ContactForm.module.css";

export default function ContactForm() {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationContactSchema}
    >
      <Form className={css.contactForm}>
        <div className={css.divContact}>
          <label htmlFor={nameFieldId} className={css.label}>
            Name
          </label>
          <Field
            type="text"
            name="name"
            id={nameFieldId}
            placeholder="Kari Pott"
            className={css.input}
          />
          <ErrorMessage
            className={css.formError}
            name="name"
            component="span"
          />
        </div>
        <div className={css.divContact}>
          <label htmlFor={numberFieldId} className={css.label}>
            Number
          </label>
          <Field name="number">
            {({ field }) => (
              <MaskedInput
                {...field}
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                ]}
                placeholder="050-050-50-50"
                id={numberFieldId}
                type="text"
                className={css.input}
              />
            )}
          </Field>
          <ErrorMessage
            className={css.formError}
            name="number"
            component="span"
          />
        </div>
        <button type="submit" className={css.buttonAdd}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
