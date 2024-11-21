import { ThreeCircles } from "react-loader-spinner";

import css from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div className={css.loader}>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
