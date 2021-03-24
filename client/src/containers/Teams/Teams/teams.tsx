import SideBar from "components/UI/sideBar/sideBar";
import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import styles from "./teams.module.scss";

import CardContainer from "components/UI/CardContainer/cardContainer";
import Card from "components/UI/Card/card";

const Teams = () => {
  return (
    <ViewWithSidebar>
      <SideBar sidebarTitle="Your teams" />
      <div className={styles.rightSideWrapper}>
        <div className={styles.wrapper}>
          <CardContainer title="Your Teams">
            <div className={styles.innerWrapper}>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </CardContainer>
        </div>
      </div>
    </ViewWithSidebar>
  );
};

export default Teams;
