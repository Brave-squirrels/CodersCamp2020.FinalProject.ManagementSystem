import SideBar from "components/UI/sideBar/sideBar";
import SquareCon from "components/UI/squareCon/squareCon";
import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import styles from "./teams.module.scss";
import Square from "components/UI/square/square";

const Teams = () => {
  return (
    <ViewWithSidebar>
      <SideBar />
      <div className={styles.rightSideWrapper}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Your Teams</h1>
          <SquareCon>
            <Square />
            <Square />
            <Square />
            <Square />
          </SquareCon>
        </div>
      </div>
    </ViewWithSidebar>
  );
};

export default Teams;
