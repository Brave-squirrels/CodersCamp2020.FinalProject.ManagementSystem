import { useSelector } from "react-redux";
import { RootState } from "reduxState/store";

import TeamSidebar from "../Team/teamSideBar/teamSideBar";
import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import styles from "./teams.module.scss";
import NavigationItem from "components/UI/navigationItem/navigationItem";

import CardContainer from "components/UI/CardContainer/cardContainer";
import Card from "components/UI/Card/card";

const Teams = () => {
  const user = useSelector((state: RootState) => state.login.userInformation);

  return (
    <ViewWithSidebar>
      <TeamSidebar />
      <div className={styles.rightSideWrapper}>
        <div className={styles.wrapper}>
          <CardContainer title="Your Teams">
            <div className={styles.innerWrapper}>
              {user.teams && user.teams.length ? (
                user.teams.map((el: any) => (
                  <NavigationItem path={`/teams/${el.id}`} key={el.id}>
                    <Card key={el.id}>
                      <h3 className={styles.cardHeader}>{el.name}</h3>
                    </Card>
                  </NavigationItem>
                ))
              ) : (
                <div>You have not joined any teams yet...</div>
              )}
            </div>
          </CardContainer>
        </div>
      </div>
    </ViewWithSidebar>
  );
};

export default Teams;
