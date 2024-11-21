import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/filters/selectors";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts) || [];

  return (
    <ul className={css.ulList}>
      {contacts.length > 0 &&
        contacts.map((contact) => (
          <li key={contact.id} className={css.liList}>
            <Contact contact={contact} />
          </li>
        ))}
    </ul>
  );
}
