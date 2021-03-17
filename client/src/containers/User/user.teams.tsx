import React from "react";
import { Card, CardContent, Grid, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./user.style";

const template = ["Team 1", "Team 2", "Team 3", "Team 4"];

const UserTeams = () => {
  const classes = useStyles();

  const singleCard = (project: string, index: number) => {
    return (
      <Grid key={index} item xs={12} sm={6}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6">{project}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <Typography variant="h4" align="center">
        Your teams
      </Typography>
      <Paper className={classes.paper}>
        <Grid container spacing={6}>
          {template.map((project, i) => singleCard(project, i))}
        </Grid>
      </Paper>
    </>
  );
};

export default UserTeams;
