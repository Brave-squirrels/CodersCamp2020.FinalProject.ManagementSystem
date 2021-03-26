import { useEffect, useState } from "react";
import classes from "./sidebar.module.scss";

const SideBar = (props: any) => {
  const [reveal, setReveal] = useState(true);
  const [navClasses, changeNavClasses] = useState([
    classes.sideBarShown,
    classes.sideBarHidden,
  ]);

  const changeReveal = () => {
    setReveal(!reveal);
  };

  useEffect(() => {
    reveal
      ? changeNavClasses([classes.sideBarShown])
      : changeNavClasses([classes.sideBarShown, classes.sideBarHidden]);
  }, [reveal]);

  return (
    <>
      <div
        className={navClasses.join(" ")}
        onClick={() => (reveal ? null : changeReveal())}
      >
        <p className={classes.title}>{props.title}</p>
        {props.children}
        <p className={classes.backCon}>
          <span onClick={changeReveal} className={classes.backBtn}>
            &#8617;
          </span>
        </p>
      </div>
    </>
  );
};

export default SideBar;
