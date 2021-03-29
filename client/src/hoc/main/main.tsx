import React from "react";
import styles from "./main.module.scss";
import Particles from "./particles";

const main = (props: any) => {
  return (
    <main className={styles.mainCon}>
      {props.children}
      <Particles />
    </main>
  );
};

export default main;
