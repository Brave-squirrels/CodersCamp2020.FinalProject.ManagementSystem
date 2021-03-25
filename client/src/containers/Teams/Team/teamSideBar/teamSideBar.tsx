import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../../axios/axiosMain";

import * as types from "../../../../utils/types";

import PrimaryActiveItem from "components/UI/sideBar/sidebarItems/primaryActiveItem/primaryActiveItem";
import PrimaryInactiveItem from "components/UI/sideBar/sidebarItems/primaryInactiveItem/primaryInactiveItem";
import SecondaryItem from "components/UI/sideBar/sidebarItems/secondaryItem/secondaryItem";
import SideBar from "components/UI/sideBar/sideBar";
import NavLink from "components/UI/sideBar/sidebarItems/navLink/navLink";
import PrimaryList from "components/UI/sideBar/sidebarItems/primaryList/primaryList";
import SecondaryList from "components/UI/sideBar/sidebarItems/secondaryList/secondaryList";
import LiItem from "components/UI/sideBar/sidebarItems/liItem/liItem";

const TeamSidebar = () => {
  const [userTeams, setUserTeams] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const history = useHistory();
  const { teamId } = useParams<types.TParams>();

  // import list of teams and projects of current active team
  const changeTeam = (e: any) => {
    history.push(`/teams/${e.target.id}`);
  };

  const fetchUserTeams = () => {
    return axios
      .get("/users/me", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => setUserTeams(res.data.teams))
      .catch((err) => err.response.data);
  };

  const revealProjects = () => {
    axios
      .get(`/teams/${teamId}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        return setUserProjects(res.data.projects);
      })
      .catch((err) => err.response.data);
  };

  useEffect(() => {
    setUserProjects([]);
    fetchUserTeams();
    revealProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  return (
    <SideBar title={"Your teams"}>
      <PrimaryList>
        {userTeams.map((team: any) => (
          <>
            {team.id === teamId ? (
              <LiItem teamId={team.id}>
                <PrimaryActiveItem name={team.name} />
                <SecondaryList>
                  {userProjects.map((project: any) => (
                    <NavLink
                      teamId={teamId}
                      projectId={project.id}
                      key={project.id}
                    >
                      <SecondaryItem id={project.id} name={project.name} />
                    </NavLink>
                  ))}
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
