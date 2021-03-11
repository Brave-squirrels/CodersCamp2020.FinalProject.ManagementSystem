import React from "react";

import styles from "./main.module.scss";

const main = (props: any) => {
  return <div className={styles.mainCon}>{props.children}</div>;
};

export default main;
