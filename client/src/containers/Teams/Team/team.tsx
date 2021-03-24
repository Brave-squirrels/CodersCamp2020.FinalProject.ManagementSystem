import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import * as types from "utils/types";

import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import SideBar from "components/UI/sideBar/sideBar";
import TeamSidebar from "./teamSideBar/teamSideBar";

import { fetchTeam } from "reduxState/teamDataSlice";

const Team = () => {
  const dispatch = useDispatch();
  const { teamId } = useParams<types.TParams>();

  useEffect(() => {
    dispatch(fetchTeam(teamId));
  }, [dispatch, teamId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ViewWithSidebar>
      <SideBar>
        <TeamSidebar />
      </SideBar>
    </ViewWithSidebar>
  );
};

export default Team;
