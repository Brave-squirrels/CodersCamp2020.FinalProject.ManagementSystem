import React, { FunctionComponent } from "react";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTeams } from "reduxState/userSlice";
import Card from "components/UI/Card";
import CardContainer from "components/UI/CardContainer";
import classes from "./user.module.scss";
import Button from "components/UI/formElements/button/button";
import NavigationItem from "components/UI/navigationItem/navigationItem";

const UserTeams: FunctionComponent = () => {
  const teams = useSelector(selectTeams);
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
            <NavigationItem path={`/teams/${id}`} key={id}>
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
