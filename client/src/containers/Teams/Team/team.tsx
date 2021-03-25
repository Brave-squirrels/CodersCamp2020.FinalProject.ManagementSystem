import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "reduxState/store";

import * as types from "utils/types";

import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import SideBar from "components/UI/sideBar/sideBar";
import styles from "./team.module.scss";
import TeamSidebar from "./teamSideBar/teamSideBar";

import { fetchTeam } from "reduxState/teamDataSlice";

const Team = () => {
  const dispatch = useDispatch();

  const { teamId } = useParams<types.TParams>();

  const state = useSelector((state: RootState) => state.singleTeamData);

  useEffect(() => {
    dispatch(fetchTeam(teamId));
  }, [dispatch, teamId]); // eslint-disable-line react-hooks/exhaustive-deps

  const ownerIndex = state.team.members.findIndex((member: any) => state.team.ownerId)
  
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
              <div className={styles.owner}>
                <p className={styles.tileTitle}>Owner</p>
                <div className={styles.content}>{state.team.members[ownerIndex].userName}</div>
              </div>

              <div className={styles.description}>
                <p className={styles.tileTitle}>Creation date</p>
                <div className={styles.content}>{(state.team.startDate).match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}</div>
              </div>

              <div className={styles.description}>
                <p className={styles.tileTitle}>Description</p>
                <div className={styles.content}>{state.team.description}</div>
              </div>

            </div>

            <div className={styles.members}>
              <p className={styles.tileTitle}>Members</p>
              <div className={styles.content}>
                {state.team.members.map((member: any) => member.userName)}
              </div>
            </div>
            <div className={styles.moderators}>
              <p className={styles.tileTitle}>Moderators</p>
              <div className={styles.content}>
                {state.team.moderatorsId.map((id: any) => id)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViewWithSidebar>
  );
};

export default Team;
