import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "reduxState/store";

import * as types from "utils/types";

import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import SideBar from "components/UI/sideBar/sideBar";
import styles from "./team.module.scss";
// import classes from "./user.module.scss";
import NavigationItem from "components/UI/navigationItem/navigationItem";
import Card from "components/UI/Card";

import { fetchTeam } from "reduxState/teamDataSlice";

const Team = () => {
  const dispatch = useDispatch();

  const { teamId } = useParams<types.TParams>();

  const state = useSelector((state: RootState) => state.singleTeamData);

  useEffect(() => {
    dispatch(fetchTeam(teamId));
  }, [dispatch, teamId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ViewWithSidebar>
      <SideBar sidebarTitle="Your teams" />
      <div className={styles.rightSideWrapper}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{state.team.teamName}</h1>

          {/* Container for team's info */}
          <div className={styles.container}>
            <div className={styles.descriptionTile}>
              <p className={styles.tileTitle}>Description</p>
              <div className={styles.content}>{state.team.description}</div>
            </div>
            <div className={styles.ownerTile}>
              <p className={styles.tileTitle}>Owner</p>
              <div className={styles.content}>{state.team.ownerId}</div>
            </div>
            <div className={styles.moderatorsTile}>
              <p className={styles.tileTitle}>Moderators</p>
              <div className={styles.content}>
                {state.team.moderatorsId.map((id: any) => id)}
              </div>
            </div>
            <div className={styles.membersTile}>
              <p className={styles.tileTitle}>Members</p>
              <div className={styles.content}>
                {state.team.members.map((member: any) => member.userName)}
              </div>
            </div>
            <div className={styles.projectsTile}>
              <p className={styles.tileTitle}>Projects</p>
              <div className={styles.projectsContainer}>
                {state.team.projects.map(({ name, id }: any) => (
                  <NavigationItem
                    path={`/teams/${teamId}/projects/${id}`}
                    key={id}
                  >
                    <Card key={id}>
                      <h3>{name}</h3>
                    </Card>
                  </NavigationItem>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViewWithSidebar>
  );
};

export default Team;
