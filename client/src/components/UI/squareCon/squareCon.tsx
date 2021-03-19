import React from 'react';
import classes from "./squareCon.module.scss";

const SquareCon = (props: any) => {
  return <div className={classes.squareCon}>{props.children}</div>;
};

export default SquareCon;
