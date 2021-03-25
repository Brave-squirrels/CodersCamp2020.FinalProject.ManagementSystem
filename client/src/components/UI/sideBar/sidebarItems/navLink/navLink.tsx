import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./navLink.module.scss";

interface Props {
  teamId: string;
  projectId: string;
  key: string;
  children: JSX.Element;
}

const navLink = (props: Props) => {
  return (
    <NavLink
      to={`/teams/${props.teamId}/projects/${props.projectId}`}
      exact
      className={classes.navLink}
      key={props.projectId}
    >
      {props.children}
    </NavLink>
  );
};

export default navLink;
