import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";

import css from "./SearchBox.module.css";

export default function SearchBox() {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const action = changeFilter(evt.target.value);
    dispatch(action);
  };

  return (
    <label className={css.label}>
      <span style={{ fontSize: "18px", marginBottom: "6px" }}>
        Find contacts by name or number
      </span>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        className={css.input}
      />
    </label>
  );
}
