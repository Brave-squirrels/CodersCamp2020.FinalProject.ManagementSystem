import React from "react";
import { Card, CardContent, Grid, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./user.style";

const template = [
  "Project 1",
  "Project 2",
  "Project 3",
  "Project 4",
  "Project 5",
];

const UserProjects = () => {
  const classes = useStyles();

  const singleCard = (project: string, index: number) => {
    return (
      <Grid key={index} item xs={12} sm={6}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" component="h3">
              {project}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <Typography variant="h4" component="h2" align="center">
        Your projects
      </Typography>
      <Paper className={classes.paper}>
        <Grid container spacing={6}>
          {template.map((project, i) => singleCard(project, i))}
        </Grid>
      </Paper>
    </>
  );
};

export default UserProjects;
