import React, { FunctionComponent } from "react";
import SingleCard from "./singleCard";
import classes2 from "./card.module.scss";

interface Props {
  projects: never[];
}

const UserProjects: FunctionComponent<Props> = ({ projects }) => {
  return (
    <>
      <h2 className={classes2.teamsHeader}>Your projects</h2>
      <div className={classes2.board}>
        {projects.length ? (
          projects.map(({ name, id }) => <SingleCard key={id} {...{ name }} />)
        ) : (
          <div>You don't have any project yet ...</div>
        )}
      </div>
    </>
  );
};

export default UserProjects;
