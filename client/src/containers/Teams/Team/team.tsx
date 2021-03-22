import SideBar from "components/UI/sideBar/sideBar";
import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import styles from "./team.module.scss";

const Team = () => {
  return (
    <ViewWithSidebar>
      <SideBar />
      <div className={styles.rightSideWrapper}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Team A</h1>

          {/* Container for team's info */}
          <div className={styles.container}></div>
        </div>
      </div>
    </ViewWithSidebar>
  );
};

export default Team;
