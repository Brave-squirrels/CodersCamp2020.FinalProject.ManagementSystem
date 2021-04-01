import React from "react";

import styles from "./taskCard.module.scss";

interface Props {
  children: string;
  clicked?: any;
}

const taskCard = (props: Props) => {
  return (
    <li className={styles.taskCard} onClick={props.clicked}>
      {props.children}
    </li>
  );
};

export default taskCard;
