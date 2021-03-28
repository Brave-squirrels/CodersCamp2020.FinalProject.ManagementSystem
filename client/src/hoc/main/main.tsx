import React from "react";
import ParticlesCon from "./particles";

import styles from "./main.module.scss";

const main = (props: any) => {
  return (
    <main className={styles.mainCon}>
      {props.children}
      <ParticlesCon />
    </main>
  );
};

export default main;
