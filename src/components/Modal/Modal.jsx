import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { IoMdCloseCircle } from "react-icons/io";
import MaskedInput from "react-text-mask";

import { closeModal } from "../../redux/modal/slice";
import { updateContact } from "../../redux/contacts/operations";
import { selectModalState } from "../../redux/modal/selectors";
import { validationContactSchema } from "../../utils/schema";

import css from "./Modal.module.css";

export default function Modal() {
  const dispatch = useDispatch();
  const { isOpen, contentData } = useSelector(selectModalState);
  const modalRef = useRef();

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        dispatch(closeModal());
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [dispatch]);

  const handleOverlayClick = (event) => {
    if (event.target === modalRef.current) {
      dispatch(closeModal());
    }
  };

  const handleSubmitClick = (values, actions) => {
    const editableContact = {
      id: contentData.id,
      ...values,
    };

    dispatch(updateContact(editableContact))
      .then(() => {
        toast.success("Contact updated successfully!");
        dispatch(closeModal());
        actions.resetForm();
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update the contact");
      });
  };

  if (!isOpen) return null;

  return (
    <div className={css.overlay} ref={modalRef} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <button onClick={() => dispatch(closeModal())} className={css.closeBtn}>
          <IoMdCloseCircle />
        </button>
        <h2>Edit Contact</h2>
        {contentData && (
          <Formik
            initialValues={{
              name: contentData.name || "",
              number: contentData.number || "",
            }}
            validationSchema={validationContactSchema}
            onSubmit={handleSubmitClick}
          >
            {({ isSubmitting }) => (
              <Form className={css.form}>
                <div className={css.formDiv}>
                  <label htmlFor="name" className={css.label}>
                    New Name:
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Kari Pott"
                    className={css.input}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css.error}
                  />
                </div>
                <div className={css.formDiv}>
                  <label htmlFor="number" className={css.label}>
                    New Number:
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
                        id="number"
                        type="tel"
                        placeholder="050-050-50-50"
                        className={css.input}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="number"
                    component="div"
                    className={css.error}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={css.saveBtn}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
