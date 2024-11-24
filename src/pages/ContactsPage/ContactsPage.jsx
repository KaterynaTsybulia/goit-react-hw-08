import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  selectError,
  selectLoading,
} from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import { useEffect } from "react";
import { Spinner } from "../../components/Spinner/Spinner";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>

      <ContactForm />
      <SearchBox />
      {items.length === 0 && (
        <p className={css.text}>
          There are no contacts in your phone book yet!
        </p>
      )}
      {loading && <Spinner /> && !error && (
        <p className={css.text}>Request in progress...</p>
      )}
      {error ? (
        <p className={css.error}>An error occured: {error}</p>
      ) : (
        <ContactList />
      )}
    </div>
  );
}
