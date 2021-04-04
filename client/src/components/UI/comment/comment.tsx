import React from "react";

import styles from "./comment.module.scss";

interface Props {
  name: string;
  content: string;
  date: string;
  children?: any;
}

const comment = (props: Props) => {
  return (
    <div className={styles.commentWrapper}>
      {props.children}
      <div className={styles.author}>{props.name}</div>
      <div className={styles.content}>{props.content}</div>
      <div className={styles.date}>
        {props.date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
      </div>
    </div>
  );
};

export default comment;
