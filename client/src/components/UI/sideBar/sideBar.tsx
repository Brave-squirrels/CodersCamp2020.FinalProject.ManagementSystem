import classes from "./sidebar.module.scss";

const SideBar = (props :any) => {
  return <div className={classes.sideBar}>{props.children}</div>;
};

export default SideBar;
