import React from "react";

import UserProjects from "./user.projects";
import UserTeams from "./user.teams";
import classes from "./user.module.scss";

const User = () => {
  return (
    <div className={classes.userContainer}>
      <div className={classes.element}>
        <UserTeams />
      </div>
      <div className={classes.element}>
        <UserProjects />
      </div>
    </div>
  );
};

export default User;
