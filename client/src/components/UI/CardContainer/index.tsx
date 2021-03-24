import React from "react";
import classes from "./cardContainer.module.scss";
interface Props {
  children: any;
  title: string;
}
const CardContainer = (props: Props) => {
  return (
    <>
      <h1 className={classes.title}>{props.title}</h1>
      <div className={classes.board}>{props.children}</div>
    </>
  );
};

export default CardContainer;
