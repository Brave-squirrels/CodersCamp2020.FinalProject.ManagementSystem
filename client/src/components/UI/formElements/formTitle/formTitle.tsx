import React from "react";

import styles from "./formTitle.module.scss";

interface Props {
  children: string;
}

const formTitle = (props: Props) => {
  return <span className={styles.formTitle}>{props.children}</span>;
};

export default formTitle;
