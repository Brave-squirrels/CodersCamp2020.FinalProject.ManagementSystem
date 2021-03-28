import React from "react";
import { /*  useHistory, */ useParams, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as types from "../../../../utils/types";
/* import styles from "./projectSidebar.module.scss";

import PrimaryActiveItem from "components/UI/sideBar/sidebarItems/primaryActiveItem/primaryActiveItem";
import PrimaryInactiveItem from "components/UI/sideBar/sidebarItems/primaryInactiveItem/primaryInactiveItem";
import SecondaryItem from "components/UI/sideBar/sidebarItems/secondaryItem/secondaryItem";
import PrimaryList from "components/UI/sideBar/sidebarItems/primaryList/primaryList";
import SecondaryList from "components/UI/sideBar/sidebarItems/secondaryList/secondaryList";
import LiItem from "components/UI/sideBar/sidebarItems/liItem/liItem"; */
import SideBar from "components/UI/sideBar/sideBar";
import SpinnerLight from "components/UI/spinnerLight/spinner";

import { RootState } from "reduxState/store";
import { fetchProject } from "reduxState/projectDataSlice";

const ProjectSidebar = () => {
  const dispatch = useDispatch();
  /*  const history = useHistory(); */

  const { teamId, projectId } = useParams<types.TParams>();

  const state = useSelector((state: RootState) => state.singleProjectData);
  const user = useSelector((state: RootState) => state.login.userInformation);
  /*   const userTeam = useSelector((state: RootState) => state.singleTeamData); */

  useEffect(() => {
    console.log(state);
    console.log(user);
    dispatch(fetchProject(teamId, projectId));
  }, [dispatch, projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SideBar
      title={
        <NavLink to={`/teams/${state.project.team.id}`} exact>
          {state.project.team.name}
        </NavLink>
      }
    >
      <SpinnerLight />
    </SideBar>
  );
};

export default ProjectSidebar;
