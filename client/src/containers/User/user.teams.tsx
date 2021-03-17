import React, { FunctionComponent } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import SingleCard from "./singleCard";
import { useStyles } from "./user.style";

interface Props {
  teams: never[];
}

const UserTeams: FunctionComponent<Props> = ({ teams }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" component="h2" align="center">
        Your teams
      </Typography>
      <Paper className={classes.paper}>
        <Grid container spacing={6}>
          {teams.length ? (
            teams.map(({ name, id }) => <SingleCard key={id} {...{ name }} />)
          ) : (
            <Typography variant="h6" component="h2" align="center">
              You are not on any team yet...
            </Typography>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default UserTeams;
