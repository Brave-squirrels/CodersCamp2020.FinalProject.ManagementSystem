import { useHistory, useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../../axios/axiosMain";

import * as types from "../../../../utils/types";
import classes from "../../../../components/UI/sideBar/sidebar.module.scss";

import PrimaryActiveItem from "components/UI/sideBar/sidebarItems/primaryActiveItem";
import PrimaryInactiveItem from "components/UI/sideBar/sidebarItems/primaryInactiveItem";
import SecondaryItem from "components/UI/sideBar/sidebarItems/secondaryItem";

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
    <>
      <p className={classes.title}>Your teams</p>
      <ul className={classes.primaryList}>
        {userTeams.map((team: any) => (
          <>
            {team.id === teamId ? (
              <li key={team.id} id={team.id}>
                <PrimaryActiveItem teamName={team.name} />
                <ul className={classes.secondaryList}>
                  {userProjects.map((project: any) => (
                    <NavLink
                      to={`/teams/${teamId}/projects/${project.id}`}
                      exact
                      className={classes.navLink}
                      key={project.id}
                    >
                      <SecondaryItem id={project.id} name={project.name} />
                    </NavLink>
                  ))}
                </ul>
              </li>
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
      </ul>
    </>
  );
};

export default TeamSidebar;
