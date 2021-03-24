import React, { FunctionComponent } from "react";
import classes from "./card.module.scss";

const Card: FunctionComponent = ({ children }) => {
  return <div className={classes.card}>{children}</div>;
};

export default Card;
