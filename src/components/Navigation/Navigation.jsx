import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectUserIsLoggedIn } from "../../redux/auth/selectors";

const buildCssClasses = ({ isActive }) =>
  clsx(css.link, isActive && css.active);

export const Navigation = () => {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);

  return (
    <div className={css.navigation}>
      <NavLink to="/" className={buildCssClasses}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={buildCssClasses}>
          Contacts
        </NavLink>
      )}
    </div>
  );
};
