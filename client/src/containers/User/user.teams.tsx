import React, { FunctionComponent } from "react";
import Card from "components/UI/Card";
import CardContainer from "components/UI/CardContainer";
import classes from "./user.module.scss";

interface Props {
  teams: never[];
}

const UserTeams: FunctionComponent<Props> = ({ teams }) => {
  return (
    <>
      <h2 className={classes.teamsHeader}>Your projects</h2>
      <CardContainer>
        {teams && teams.length ? (
          teams.map(({ name, id }) => (
            <Card key={id}>
              {/* <h3 className={classes.cardHeader}>{name}</h3> */}
            </Card>
          ))
        ) : (
          <div>You have not joined any teams yet...</div>
        )}
      </CardContainer>
    </>
  );
};

export default UserTeams;
