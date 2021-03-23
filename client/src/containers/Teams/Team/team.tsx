import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "reduxState/store";

import * as types from "utils/types";

import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import SideBar from "components/UI/sideBar/sideBar";
import styles from "./team.module.scss";

import { fetchTeam } from "reduxState/teamDataSlice";

const Team = () => {
  const dispatch = useDispatch();
  const [localTeamData, setTeamData] = useState<types.TeamData>({
    ...types.baseTeamSetup,
  });

  const state = useSelector((state: RootState) => state.singleTeamData);

  const { teamId } = useParams<types.TParams>();

  useEffect(() => {
    dispatch(fetchTeam(teamId));
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ViewWithSidebar>
      <SideBar sidebarTitle="Your teams" data={localTeamData} />
      <div className={styles.rightSideWrapper}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{state.team.teamName}</h1>

          {/* Container for team's info */}
          <div className={styles.container}></div>
        </div>
      </div>
    </ViewWithSidebar>
  );
};

export default Team;
