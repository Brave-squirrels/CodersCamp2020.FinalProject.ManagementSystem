import React from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "./user.style";
import UserTeams from "./user.teams";
import UserProjects from "./user.projects";

const User = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={6} className={classes.content}>
      <Grid item sm={12} md={6}>
        <UserTeams />
      </Grid>
      <Grid item sm={12} md={6}>
        <UserProjects />
      </Grid>
    </Grid>
  );
};

export default User;
