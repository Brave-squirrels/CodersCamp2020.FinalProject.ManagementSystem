import React, { useEffect, useState } from "react";
import axios from "axios/axiosMain";
import UserProjects from "./user.projects";
import UserTeams from "./user.teams";
import classes2 from "./user.module.scss";

const User = () => {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const result = (
        await axios("/users/me", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
      ).data;
      setTeams(result.teams);
      setProjects(result.projects);
    })();
  }, []);

  return (
    <div className={classes2.userContainer}>
      <div className={classes2.element}>
        <UserTeams {...{ teams }} />
      </div>
      <div className={classes2.element}>
        <UserProjects {...{ projects }} />
      </div>
    </div>
  );
};

export default User;
