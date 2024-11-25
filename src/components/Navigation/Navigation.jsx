import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsHousesFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import clsx from "clsx";

import { selectUserIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Navigation.module.css";

const buildCssClasses = ({ isActive }) =>
  clsx(css.link, isActive && css.active);

export const Navigation = () => {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  return (
    <div className={css.navigation}>
      <NavLink to="/" className={buildCssClasses}>
        <BsHousesFill className={css.icon} />
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={buildCssClasses}>
          <FaAddressBook className={css.icon} />
          Contacts
        </NavLink>
      )}
    </div>
  );
};
