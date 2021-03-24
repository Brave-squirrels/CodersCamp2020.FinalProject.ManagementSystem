import { useState } from "react";
import classes from "./sidebar.module.scss";

const SideBar = (props: any) => {
  const [reveal, setReveal] = useState(false);

  const changeReveal = () => {
    setReveal(!reveal);
  };

  return (
    <>
      {reveal ? (
        <div className={classes.sideBarShown}>
          {props.children}
          <p className={classes.back} onClick={changeReveal}>
            Back
          </p>
        </div>
      ) : (
        <div className={classes.sideBarHidden} onClick={changeReveal}></div>
      )}
    </>
  );
};

export default SideBar;
