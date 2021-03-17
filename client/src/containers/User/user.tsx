import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "./user.style";
import axios from "axios/axiosMain";
import UserTeams from "./user.teams";
import UserProjects from "./user.projects";

const User = () => {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const classes = useStyles();

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
    <Grid container spacing={6} className={classes.content}>
      <Grid item sm={12} md={6}>
        <UserTeams {...{ teams }} />
      </Grid>
      <Grid item sm={12} md={6}>
        <UserProjects {...{ projects }} />
      </Grid>
    </Grid>
  );
};

export default User;
