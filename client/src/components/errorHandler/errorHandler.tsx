import React from "react";

import styles from "./errorHandler.module.scss";

interface Props {
  children: string;
}

const errorHandler = (props: Props) => {
  return <div className={styles.errorContainer}>{props.children}</div>;
};

export default errorHandler;
