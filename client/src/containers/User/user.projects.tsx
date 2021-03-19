import React, { FunctionComponent } from "react";
import Card from "components/UI/Card";
import CardContainer from "components/UI/CardContainer";
import classes from "./user.module.scss";

interface Props {
  projects: never[];
}

const UserProjects: FunctionComponent<Props> = ({ projects }) => {
  return (
    <>
      <h2 className={classes.teamsHeader}>Your projects</h2>
      <CardContainer>
        {projects && projects.length ? (
          projects.map(({ name, id }) => (
            <Card key={id}>
              <h3 className={classes.cardHeader}>{name}</h3>
            </Card>
          ))
        ) : (
          <div>You don't have any project yet...</div>
        )}
      </CardContainer>
    </>
  );
};

export default UserProjects;
