import React from "react";

import classes from "./square.module.scss";

const Square = (props: any) => {
  return <div className={classes.square}>{props.children}</div>;
};

export default Square;
