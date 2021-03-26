import React from "react";
import { useSelector } from "react-redux";
import Card from "components/UI/Card/card";
import CardContainer from "components/UI/CardContainer/cardContainer";
import classes from "./user.module.scss";
import { useHistory } from "react-router";
import Button from "components/UI/formElements/button/button";

const UserProjects = () => {
  const user = useSelector((state: any) => state.login.userInformation);
  const history = useHistory();
  const buttonClicked = () => {
    history.push("/createProject");
  };

  return (
    <CardContainer title="Your projects">
      <div className={classes.innerWrapper}>
        {user.projects && user.projects.length ? (
          user.projects.map((el: any) => (
            <Card key={el.id}>
              <h3 className={classes.cardHeader}>{el.name}</h3>
            </Card>
          ))
        ) : (
          <div>You don't have any project yet...</div>
        )}
        <Button clicked={() => buttonClicked()}>New Project</Button>
      </div>
    </CardContainer>
  );
};

export default UserProjects;
