import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios/axiosMain";
import * as types from "../../../utils/types";
import { NavLink } from "react-router-dom";
import classes from "./sidebar.module.scss";

interface Object {
  id: string;
  name: string;
}

const SideBar = (props: any) => {
  const { teamId, projectId } = useParams<types.TParams>();
  const [userTeams, setUserTeams] = useState<Object[]>([]);
  const [userProjects, setUserProjects] = useState<Object[]>([]);
  const history = useHistory();

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

  useEffect(() => {
    setUserProjects([]);
    fetchUserTeams();
    revealProjects();
  }, [teamId]);

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

  return (
    <div className={classes.sideBar}>
      <p className={classes.title}>{props.sidebarTitle}</p>
      <ul className={classes.teamsList}>
        {userTeams.map((team: any) => (
          <>
            {team.id === teamId ? (
              <li key={team.id} id={team.id}>
                <div className={classes.activeTeam}>{team.name}</div>
                <ul className={classes.projectsList}>
                  {userProjects.map((project: any) =>
                    project.id !== projectId ? (
                      <NavLink
                        to={`/teams/${teamId}/projects/${project.id}`}
                        exact
                        className={classes.navLink}
                      >
                        <li
                          key={project.id}
                          className={classes.inActiveProject}
                        >
                          {project.name}
                        </li>
                      </NavLink>
                    ) : (
                      <li key={project.id} className={classes.activeProject}>
                        {project.name}
                      </li>
                    )
                  )}
                </ul>
              </li>
            ) : (
              <li
                key={team.id}
                id={team.id}
                className={classes.inactiveTeam}
                onClick={changeTeam}
              >
                {team.name}
              </li>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
