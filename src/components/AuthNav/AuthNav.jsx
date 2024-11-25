import { NavLink } from "react-router-dom";
import { ImExit } from "react-icons/im";

import css from "./AuthNav.module.css";

import clsx from "clsx";

const buildCssClasses = ({ isActive }) =>
  clsx(css.link, isActive && css.active);

export const AuthNav = () => {
  return (
    <div className={css.navigation}>
      <NavLink className={buildCssClasses} to="/register">
        Register
      </NavLink>
      <NavLink className={buildCssClasses} to="/login">
        Log In
        <ImExit className={css.icon} />
      </NavLink>
    </div>
  );
};
