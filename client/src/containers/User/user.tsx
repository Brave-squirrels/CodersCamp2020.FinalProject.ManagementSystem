import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTeamsProjects } from "reduxState/userSlice";
import UserProjects from "./user.projects";
import UserTeams from "./user.teams";
import classes from "./user.module.scss";

const User = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamsProjects());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
