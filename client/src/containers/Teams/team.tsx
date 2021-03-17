import SideBar from "../../components/UI/sideBar/sideBar";
import SquareCon from "../../components/UI/squareCon/squareCon";

import classes from "./team.module.scss";

const Team = () => {
  return (
    <div className={classes.team}>
      <SideBar />
      <SquareCon />
    </div>
  );
};

export default Team;