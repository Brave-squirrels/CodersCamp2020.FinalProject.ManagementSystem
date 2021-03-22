import React, { FunctionComponent } from "react";
import { Link, useHistory } from "react-router-dom";

import Card from "components/UI/Card";
import CardContainer from "components/UI/CardContainer";
import classes from "./user.module.scss";
import Button from "components/UI/formElements/button/button";
import NavigationItem from "components/UI/navigationItem/navigationItem";

interface Props {
  teams: never[];
}

const UserTeams: FunctionComponent<Props> = ({ teams }) => {
  const history = useHistory();

  const buttonClicked = () => {
    history.push("/createTeam");
  };

  return (
    <>
      <h2 className={classes.teamsHeader}>Your Teams</h2>
      <CardContainer>
        {teams && teams.length ? (
          teams.map(({ name, id }) => (
            <NavigationItem path={`/teams/${id}`}>
              <Card key={id}>
                <h3 className={classes.cardHeader}>{name}</h3>
              </Card>
            </NavigationItem>
          ))
        ) : (
          <div>You have not joined any teams yet...</div>
        )}
        <Button clicked={() => buttonClicked()}>New Team</Button>
      </CardContainer>
    </>
  );
};

export default UserTeams;
