import { MdPerson, MdPhone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";

import { deleteContact } from "../../redux/contacts/operations";
import Modal from "../Modal/Modal";
import { selectIsModalOpen } from "../../redux/contacts/selectors";

import css from "./Contact.module.css";
import { openModal } from "../../redux/contacts/slice";

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const isModalOpen = useSelector(selectIsModalOpen);

  const handleDelete = () => {
    setIsDeleting(true);
    dispatch(deleteContact(id))
      .then(() => {
        toast.success("Contact deleted successfully!");
      })
      .catch((error) => {
        toast.error(
          error.message || "Failed to delete the contact. Please try again."
        );
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleEdit = () => {
    dispatch(openModal({ id, name, number }));
  };

  return (
    <>
      <div>
        <p>
          <MdPerson />
          {name}
        </p>
        <p>
          <MdPhone /> {number}
        </p>
      </div>
      <div className={css.boxBtn}>
        <button onClick={handleEdit} className={css.buttonDelete}>
          <MdEdit className={css.iconEdit} />
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={css.buttonDelete}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
        {isModalOpen && <Modal />}
      </div>
    </>
  );
}
