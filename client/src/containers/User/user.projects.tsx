import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "reduxState/store";

import Card from "components/UI/Card/card";
import CardContainer from "components/UI/CardContainer/cardContainer";
import Button from "components/UI/formElements/button/button";
import SpinnerLight from "components/UI/spinnerLight/spinner";
import NavigationItem from "components/UI/navigationItem/navigationItem";
import classes from "./user.module.scss";

const UserProjects = () => {
  const user = useSelector((state: RootState) => state.login.userInformation);
  const userStages = useSelector((state: RootState) => state.login);
  const history = useHistory();

  const buttonClicked = () => {
    history.push("/createProject");
  };

  return (
    <CardContainer title="Your projects">
      <div className={classes.innerWrapper}>
        {userStages.loading ? (
          <SpinnerLight />
        ) : (
          <>
            {user.projects && user.projects.length ? (
              user.projects.map((el: any) => (
                <NavigationItem
                  key={el.id}
                  path={`/teams/${el.teamId}/projects/${el.id}`}
                >
                  <Card key={el.id}>
                    <h3 className={classes.cardHeader}>{el.name}</h3>
                  </Card>
                </NavigationItem>
              ))
            ) : (
              <div>You don't have any project yet...</div>
            )}
            <Button clicked={() => buttonClicked()}>New Project</Button>
          </>
        )}
      </div>
    </CardContainer>
  );
};

export default UserProjects;
