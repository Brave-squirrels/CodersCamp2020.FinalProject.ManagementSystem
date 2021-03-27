import React from "react";

import styles from "./emptyNotification.module.scss";

interface Props {
  children: string;
}

const emptyNotification = ({ children }: Props) => {
  return <span className={styles.text}>{children}</span>;
};

export default emptyNotification;
