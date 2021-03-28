import TeamSidebar from "../Team/teamSideBar/teamSideBar";
import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import styles from "./teams.module.scss";

import CardContainer from "components/UI/CardContainer/cardContainer";
import Card from "components/UI/Card/card";

const Teams = () => {
  return (
    <ViewWithSidebar>
      <TeamSidebar />
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
