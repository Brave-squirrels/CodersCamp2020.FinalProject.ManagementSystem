import React, { FunctionComponent } from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./user.style";

interface Props {
  name: string;
}

const SingleCard: FunctionComponent<Props> = ({ name }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h3">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SingleCard;
