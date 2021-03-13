import SideBar from "../../components/UI/sideBar/sideBar";
import SquareCon from "../../components/UI/squareCon/squareCon";

import classes from "./project.module.scss";

const Project = () => {
  return (
    <div className={classes.project}>
      <SideBar />
      <SquareCon />
    </div>
  );
};

export default Project;
