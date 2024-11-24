import { MdPerson, MdPhone } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";

import { deleteContact } from "../../redux/contacts/operations";

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
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={css.buttonDelete}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </>
  );
}
