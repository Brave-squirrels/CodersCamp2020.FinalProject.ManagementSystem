import React from "react";

import classes from "./secondaryList.module.scss";

const secondaryList = (props: any) => {
  return <ul className={classes.secondaryList}> {props.children} </ul>;
};

export default secondaryList;
