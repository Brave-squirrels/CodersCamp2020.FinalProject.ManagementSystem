import React, { FunctionComponent } from "react";
import classes from "./cardContainer.module.scss";

const CardContainer: FunctionComponent = ({ children }) => {
  return <div className={classes.board}>{children}</div>;
};

export default CardContainer;
