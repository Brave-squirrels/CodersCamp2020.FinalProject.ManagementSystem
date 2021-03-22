import SideBar from "components/UI/sideBar/sideBar";
import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import styles from "./project.module.scss";

const Project = () => {
  return (
    <ViewWithSidebar>
      <SideBar />
      <div className={styles.rightSideWrapper}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Project A</h1>

          {/* Container for project's info */}
          <div className={styles.container}></div>
        </div>
      </div>
    </ViewWithSidebar>
  );
};

export default Project;
