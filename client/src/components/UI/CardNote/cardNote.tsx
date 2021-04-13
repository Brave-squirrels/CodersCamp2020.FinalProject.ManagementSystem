import React from "react";

import styles from "./cardNote.module.scss";

interface Props {
  children: JSX.Element;
  title: string;
  content: string;
  author: string;
}

const cardNote = (props: Props) => {
  return (
    <div className={styles.noteCard}>
      {props.children}
      <span className={styles.noteTitle}>{props.title}</span>
      <span className={styles.noteContent}>{props.content}</span>
      <span className={styles.noteAuthor}>{props.author}</span>
    </div>
  );
};

export default cardNote;
