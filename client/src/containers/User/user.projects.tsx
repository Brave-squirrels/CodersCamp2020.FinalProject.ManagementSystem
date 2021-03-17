import React, { FunctionComponent } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import SingleCard from "./singleCard";
import { useStyles } from "./user.style";

interface Props {
  projects: never[];
}

const UserProjects: FunctionComponent<Props> = ({ projects }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" component="h2" align="center">
        Your projects
      </Typography>
      <Paper className={classes.paper}>
        <Grid container spacing={6}>
          {projects.length ? (
            projects.map(({ name, id }) => (
              <SingleCard key={id} {...{ name }} />
            ))
          ) : (
            <Typography variant="h6" component="h2" align="center">
              You don't have any project yet ...
            </Typography>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default UserProjects;
