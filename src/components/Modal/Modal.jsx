import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FcAbout } from "react-icons/fc";
import { IoMdCloseCircle } from "react-icons/io";

import { closeModal } from "../../redux/contacts/slice";
import { editContact } from "../../redux/contacts/operations";
import { selectContactToEdit } from "../../redux/contacts/selectors";

import css from "./Modal.module.css";
import { validationContactSchema } from "../../utils/schema";
import toast from "react-hot-toast";

export default function Modal() {
  const dispatch = useDispatch();
  const contactToEdit = useSelector(selectContactToEdit);
  const { id, name, number } = contactToEdit;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = (values) => {
    const updatedContact = {
      name: values.name.trim(),
      number: values.number.trim(),
    };

    if (updatedContact.name === name && updatedContact.number === number) {
      toast("No changes detected", { icon: <FcAbout /> });
      return;
    }

    dispatch(editContact({ contactId: id, fieldsToUpdate: updatedContact }));
    toast.success("Contact edited successfully");
    dispatch(closeModal());
  };

  return (
    <div className={css.overlay} onClick={handleClick}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={handleClose}>
          <IoMdCloseCircle />
        </button>
        <h2>Edit Contact {name}</h2>
        <Formik
          initialValues={{ name, number }}
          validationSchema={validationContactSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <div className={css.formDiv}>
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" type="text" />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>
            <div className={css.formDiv}>
              <label htmlFor="number">Number</label>
              <Field id="number" name="number" type="text" />
              <ErrorMessage
                name="number"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.actions}>
              <button
                type="button"
                onClick={handleClose}
                className={css.cancelBtn}
              >
                Cancel
              </button>
              <button type="submit" className={css.submitBtn}>
                Save
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
