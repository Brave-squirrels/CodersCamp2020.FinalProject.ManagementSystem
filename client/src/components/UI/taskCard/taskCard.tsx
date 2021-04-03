import React from "react";

import styles from "./taskCard.module.scss";

interface Props {
  children: string;
  clicked?: any;
  highLight: boolean;
}

const taskCard = (props: Props) => {
  return (
    <li
      className={
        props.highLight
          ? [styles.taskCard, styles.highlight].join(" ")
          : styles.taskCard
      }
      onClick={props.clicked}
    >
      {props.children}
    </li>
  );
};

export default taskCard;
