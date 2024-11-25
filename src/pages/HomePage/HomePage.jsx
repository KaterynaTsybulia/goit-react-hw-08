import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Welcome to the Phonebook</h1>
      <p className={css.text}>Manage your contacts easily and securely.</p>
    </div>
  );
}
