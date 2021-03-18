import React, { FunctionComponent } from "react";
import classes2 from "./card.module.scss";

interface Props {
  name: string;
}

const SingleCard: FunctionComponent<Props> = ({ name }) => {
  return (
    <div className={classes2.card}>
      <h3 className={classes2.cardHeader}>{name}</h3>
    </div>
  );
};

export default SingleCard;
