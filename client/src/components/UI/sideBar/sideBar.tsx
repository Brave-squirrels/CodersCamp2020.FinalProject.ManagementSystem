import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectProjects, selectTeams } from "reduxState/userSlice";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios/axiosMain";
import * as types from "../../../utils/types";

import classes from "./sidebar.module.scss";

interface Object {
  id: string;
  name: string;
}

const SideBar = (props: any) => {
  const { teamId } = useParams<types.TParams>();
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
        {userTeams.map(({ name, id }: any) => (
          <>
            {id === teamId ? (
              <li key={id} id={id}>
                <div className={classes.activeTeam}>{name}</div>
                <ul className={classes.projectsList}>
                  {userProjects.map(({ name, id }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </li>
            ) : (
              <li
                key={id}
                id={id}
                className={classes.inactiveTeam}
                onClick={changeTeam}
              >
                {name}
              </li>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
