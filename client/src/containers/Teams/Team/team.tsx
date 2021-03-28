import { useSelector } from "react-redux";
import { RootState } from "reduxState/store";

import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import styles from "./team.module.scss";
import TeamSidebar from "./teamSideBar/teamSideBar";
import { CardWithTitle } from "components/UI/CardWithTitle/CardWithTitle";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";

const Team = () => {
  const state = useSelector((state: RootState) => state.singleTeamData);

  const moderatorsList = state.team.moderatorsId.map((moderatorId: string) =>
    state.team.members.map((member: any) =>
      member.userId === state.team.ownerId ? member.userName : null
    )
  );

  return (
    <ViewWithSidebar>
      <TeamSidebar />
      {state.loading ? (
        <Spinner />
      ) : state.error ? (
        <ErrorHandler>Something went wrong...</ErrorHandler>
      ) : (
        <div className={styles.rightSideWrapper}>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>{state.team.teamName}</h1>

            {/* Container for team's info */}
            <div className={styles.container}>
              <div className={styles.firstColumn}>
                <CardWithTitle title={"Owner"}>
                  {state.team.members.map((member: any) =>
                    member.userId === state.team.ownerId
                      ? member.userName
                      : null
                  )}
                </CardWithTitle>

                <CardWithTitle title={"Creation date"}>
                  {state.team.startDate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
                </CardWithTitle>

                <CardWithTitle title={"Description"}>
                  {state.team.description}
                </CardWithTitle>
              </div>

              <CardWithTitle title={"Members"}>
                {state.team.members.map((member: any) => member.userName)}
              </CardWithTitle>
              <CardWithTitle title={"Moderators"}>
                {moderatorsList}
              </CardWithTitle>
            </div>
          </div>
        </div>
      )}
    </ViewWithSidebar>
  );
};

export default Team;
