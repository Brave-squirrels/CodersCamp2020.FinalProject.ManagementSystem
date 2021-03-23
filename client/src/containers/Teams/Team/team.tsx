import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setData } from "reduxState/teamDataSlice";
import { RootState } from "reduxState/store";

import * as types from "utils/types";

import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import SideBar from "components/UI/sideBar/sideBar";
import styles from "./team.module.scss";
import axios from "axios/axiosMain";
import { selectTeams } from "reduxState/userSlice";

const Team = () => {
  const dispatch = useDispatch();
  const [localTeamData, setTeamData] = useState<types.TeamData>({
    ...types.baseTeamSetup,
  });
  const { teamId } = useParams<types.TParams>();

  const fetchData = () => {
    axios
      .get(`/teams/${teamId}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        setTeamData(res.data);
        dispatch(setData(res.data));
      })
      .catch(() => console.log("err"));
  };

  useEffect(() => {
    fetchData();
  }, [teamId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ViewWithSidebar>
      <SideBar sidebarTitle="Your teams" />
      <div className={styles.rightSideWrapper}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{localTeamData.teamName}</h1>

          {/* Container for team's info */}
          <div className={styles.container}></div>
        </div>
      </div>
    </ViewWithSidebar>
  );
};

export default Team;
