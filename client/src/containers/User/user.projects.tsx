import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "reduxState/store";
import * as types from "utils/types";

import Card from "components/UI/Card/card";
import CardContainer from "components/UI/CardContainer/cardContainer";
import SpinnerLight from "components/UI/spinnerLight/spinner";
import NavigationItem from "components/UI/navigationItem/navigationItem";
import classes from "./user.module.scss";
import EmptyNotification from "components/UI/emptyNotification/emptyNotification";

const UserProjects = () => {
  const user = useSelector((state: RootState) => state.login.userInformation);
  const userStages = useSelector((state: RootState) => state.login);

  return (
    <CardContainer title="Your projects">
      <div className={classes.innerWrapper}>
        {userStages.loading ? (
          <SpinnerLight />
        ) : (
          <>
            {user.projects && user.projects.length ? (
              user.projects.map((el: types.UserProject) => (
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
              <EmptyNotification>
                You don't have any project yet...
              </EmptyNotification>
            )}
          </>
        )}
      </div>
    </CardContainer>
  );
};

export default UserProjects;
