import React from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as types from "../../../../utils/types";

import PrimaryActiveItem from "components/UI/sideBar/sidebarItems/primaryActiveItem/primaryActiveItem";
import PrimaryInactiveItem from "components/UI/sideBar/sidebarItems/primaryInactiveItem/primaryInactiveItem";
import SecondaryItem from "components/UI/sideBar/sidebarItems/secondaryItem/secondaryItem";
import PrimaryList from "components/UI/sideBar/sidebarItems/primaryList/primaryList";
import SecondaryList from "components/UI/sideBar/sidebarItems/secondaryList/secondaryList";
import LiItem from "components/UI/sideBar/sidebarItems/liItem/liItem";
import SideBar from "components/UI/sideBar/sideBar";
import SpinnerLight from "components/UI/spinnerLight/spinner";

import { RootState } from "reduxState/store";
import { fetchProject } from "reduxState/projectDataSlice";

const ProjectSidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { teamId, projectId } = useParams<types.TParams>();

  const state = useSelector((state: RootState) => state.singleProjectData);
  const user = useSelector((state: RootState) => state.login.userInformation);
  const editStages = useSelector((state: RootState) => state.updateProjectInfo);
  const changeStatusStages = useSelector(
    (state: RootState) => state.updateProjectStatus
  );

  useEffect(() => {
    dispatch(fetchProject(teamId, projectId));
  }, [projectId, teamId, editStages.success, changeStatusStages.success]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeProject = (e: any) => {
    history.push(`/teams/${teamId}/projects/${e.target.id}`);
  };

  return (
    <SideBar
      title={
        <NavLink to={`/teams/${state.project.team.id}`} exact>
          {state.project.team.name}
        </NavLink>
      }
    >
      <PrimaryList>
        {user.projects ? (
          user.projects.map((prj: types.UserProject) => {
            if (prj.teamId === teamId) {
              if (prj.id === projectId) {
                return (
                  <LiItem teamId={prj.id} key={prj.id}>
                    <NavLink
                      to={`/teams/${teamId}/projects/${prj.id}`}
                      exact
                      key={`${prj.id}prj`}
                    >
                      <PrimaryActiveItem name={prj.name} />
                    </NavLink>

                    <SecondaryList>
                      <NavLink
                        to={`/teams/${teamId}/projects/${prj.id}/notes`}
                        exact
                        key={`${prj.id}notes`}
                      >
                        <SecondaryItem id={prj.id} name={"Notes"} />
                      </NavLink>
                      <NavLink
                        to={`/teams/${teamId}/projects/${prj.id}/tasks`}
                        exact
                        key={`${prj.id}tasks`}
                      >
                        <SecondaryItem id={prj.id} name={"Tasks"} />
                      </NavLink>
                    </SecondaryList>
                  </LiItem>
                );
              } else {
                return (
                  <PrimaryInactiveItem
                    key={prj.id}
                    id={prj.id}
                    name={prj.name}
                    clickHandler={changeProject}
                  />
                );
              }
            }
            return null;
          })
        ) : (
          <SpinnerLight />
        )}
      </PrimaryList>
    </SideBar>
  );
};

export default ProjectSidebar;
