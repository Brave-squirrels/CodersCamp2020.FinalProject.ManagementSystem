import React from "react";

import styles from "./main.module.scss";

const main = (props: any) => {
  return <main className={styles.mainCon}>{props.children}</main>;
};

export default main;
