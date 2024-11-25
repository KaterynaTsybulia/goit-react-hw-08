import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectUserIsLoggedIn } from "../../redux/auth/selectors";
import { logoutUser } from "../../redux/auth/operations";
import { MdOutput } from "react-icons/md";

import css from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const userData = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={css.wrapper}>
      {isLoggedIn && (
        <>
          <span className={css.span}>Hello, {userData.name}! </span>
          <button className={css.button} onClick={handleLogout}>
            Logout
            <MdOutput className={css.icon} />
          </button>
        </>
      )}
    </div>
  );
};
