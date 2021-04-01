import React from "react";

import classes from "./square.module.scss";

interface Props {
  children: JSX.Element;
}

const Square = (props: Props) => {
  return <div className={classes.square}>{props.children}</div>;
};

export default Square;
