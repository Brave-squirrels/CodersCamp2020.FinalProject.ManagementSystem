import { useHistory, useParams, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as types from "../../../../utils/types";
import classes from "./teamSidebar.module.scss";

import PrimaryActiveItem from "components/UI/sideBar/sidebarItems/primaryActiveItem/primaryActiveItem";
import PrimaryInactiveItem from "components/UI/sideBar/sidebarItems/primaryInactiveItem/primaryInactiveItem";
import SecondaryItem from "components/UI/sideBar/sidebarItems/secondaryItem/secondaryItem";
import SideBar from "components/UI/sideBar/sideBar";
import PrimaryList from "components/UI/sideBar/sidebarItems/primaryList/primaryList";
import SecondaryList from "components/UI/sideBar/sidebarItems/secondaryList/secondaryList";
import LiItem from "components/UI/sideBar/sidebarItems/liItem/liItem";

import { fetchTeam } from "reduxState/teamDataSlice";

const TeamSidebar = () => {
  const history = useHistory();
  const { teamId } = useParams<types.TParams>();

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.login.userInformation);
  const userTeam = useSelector((state: any) => state.singleTeamData);

  // import list of teams and projects of current active team
  const changeTeam = (e: any) => {
    history.push(`/teams/${e.target.id}`);
  };

  useEffect(() => {
    dispatch(fetchTeam(teamId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  return (
    <SideBar title={"Your teams"}>
      <PrimaryList>
        {user.teams.map((team: any) => (
          <>
            {team.id === teamId ? (
              <LiItem teamId={team.id}>
                <PrimaryActiveItem name={team.name} />
                <SecondaryList>
                  {userTeam.team.projects
                    ? userTeam.team.projects.map((project: any) => (
                        <>
                          <NavLink
                            to={`/teams/${teamId}/projects/${project.id}`}
                            exact
                            className={classes.navLink}
                            key={project.id}
                          >
                            <SecondaryItem
                              id={project.id}
                              name={project.name}
                            />
                          </NavLink>
                        </>
                      ))
                    : null}
                </SecondaryList>
              </LiItem>
            ) : (
              <PrimaryInactiveItem
                key={team.id}
                id={team.id}
                name={team.name}
                clickHandler={changeTeam}
              />
            )}
          </>
        ))}
      </PrimaryList>
    </SideBar>
  );
};

export default TeamSidebar;
