import React from "react";

import styles from "./successHandler.module.scss"

interface Props {
  children: string;
}

const successHandler = (props: Props) => {
  return <div className={styles.successContainer}>{props.children}</div>;
};

export default successHandler;
