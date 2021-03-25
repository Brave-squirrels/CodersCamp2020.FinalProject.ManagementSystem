import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "reduxState/store";

import * as types from "utils/types";

import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import SideBar from "components/UI/sideBar/sideBar";
import styles from "./team.module.scss";
import TeamSidebar from "./teamSideBar/teamSideBar";
import { CardWithTitle } from "components/UI/CardWithTitle/CardWithTitle";

import { fetchTeam } from "reduxState/teamDataSlice";

const Team = () => {
  const dispatch = useDispatch();

  const { teamId } = useParams<types.TParams>();

  const state = useSelector((state: RootState) => state.singleTeamData);

  useEffect(() => {
    dispatch(fetchTeam(teamId));
  }, [dispatch, teamId]); // eslint-disable-line react-hooks/exhaustive-deps

  const moderatorsList = state.team.moderatorsId.map((moderatorId: string) =>
    state.team.members.map((member: any) =>
      member.userId === state.team.ownerId ? member.userName : null
    )
  );

  return (
    <ViewWithSidebar>
      <SideBar>
        <TeamSidebar />
      </SideBar>
      <div className={styles.rightSideWrapper}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{state.team.teamName}</h1>

          {/* Container for team's info */}
          <div className={styles.container}>
            <div className={styles.firstColumn}>
              <CardWithTitle title={"Owner"}>
                {state.team.members.map((member: any) =>
                  member.userId === state.team.ownerId ? member.userName : null
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
            <CardWithTitle title={"Moderators"}>{moderatorsList}</CardWithTitle>
          </div>
        </div>
      </div>
    </ViewWithSidebar>
  );
};

export default Team;
