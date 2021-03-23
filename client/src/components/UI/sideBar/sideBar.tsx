import { useState } from "react";
import { useSelector } from "react-redux";
import { selectProjects, selectTeams } from "reduxState/userSlice";
import axios from "axios/axiosMain";

import classes from "./sidebar.module.scss";

interface Project {
  id: string;
  name: string;
}

const SideBar = (props: any) => {
  const [fetchedProjects, setFetchedProject] = useState([]);
  const [teamProjects, setTeamProjects] = useState<Project[]>([]);
  const teams = useSelector(selectTeams);
  const projects = useSelector(selectProjects);

  const fetchTeamProject = (teamId: string) => {
    return axios
      .get(`teams/${teamId}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => res.data.projects)
      .catch((err) => err.response.data);
  };

  const revealProjects = async (e: any) => {
    const result = await fetchTeamProject(e.target.id);

    setTeamProjects(result);
  };

  return (
    <div className={classes.sideBar}>
      <p className={classes.title}>{props.sidebarTitle}</p>
      <ul className={classes.teamsList}>
        {teams.map(({ name, id }) => (
          <li key={id} onClick={revealProjects} id={id}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
