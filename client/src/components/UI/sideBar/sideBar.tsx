import { useState } from "react";
import classes from "./sidebar.module.scss";

const SideBar = (props: any) => {
  const [reveal, setReveal] = useState(false);

  const changeReveal = () => {
    setReveal(!reveal);
  };

  let navClasses = [classes.sideBarShown];

  if (!reveal) {
    navClasses = [classes.sideBarShown, classes.sideBarHidden];
  }

  return (
    <>
      <div
        className={navClasses.join(" ")}
        onClick={() => {
          if (reveal) {
            return;
          } else {
            changeReveal();
          }
        }}
      >
        <p className={classes.title}>{props.title}</p>
        {props.children}
        <p className={classes.back} onClick={changeReveal}>
          &#8592;
        </p>
      </div>
    </>
  );
};

export default SideBar;
