import React, { FunctionComponent } from "react";
import SingleCard from "./singleCard";
import classes2 from "./card.module.scss";

interface Props {
  teams: never[];
}

const UserTeams: FunctionComponent<Props> = ({ teams }) => {
  return (
    <>
      <h2 className={classes2.teamsHeader}>Your projects</h2>
      <div className={classes2.board}>
        {teams.length ? (
          teams.map(({ name, id }) => <SingleCard key={id} {...{ name }} />)
        ) : (
          <div>You don't have any project yet ...</div>
        )}
      </div>
    </>
  );
};

export default UserTeams;
