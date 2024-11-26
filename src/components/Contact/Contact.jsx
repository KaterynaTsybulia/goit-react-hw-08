import { useDispatch } from "react-redux";
import { useState } from "react";

import toast from "react-hot-toast";
import { MdPerson, MdPhone, MdEdit } from "react-icons/md";

import { deleteContact } from "../../redux/contacts/operations";
import { openModal } from "../../redux/modal/slice";

import css from "./Contact.module.css";

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

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
    dispatch(
      openModal({
        id,
        name,
        number,
      })
    );
  };

  return (
    <>
      <div className={css.contact}>
        <p>
          <MdPerson />
          {name}
        </p>
        <p>
          <MdPhone /> {number}
        </p>
      </div>
      <div className={css.boxBtn}>
        <button onClick={handleEdit} className={css.btnEdit}>
          <MdEdit className={css.iconEdit} />
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={css.btnDelete}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </>
  );
}
