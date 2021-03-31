import React from "react";

import styles from "./taskCard.module.scss";

interface Props {
  children: string;
}

const taskCard = (props: Props) => {
  return <li className={styles.taskCard}>{props.children}</li>;
};

export default taskCard;
