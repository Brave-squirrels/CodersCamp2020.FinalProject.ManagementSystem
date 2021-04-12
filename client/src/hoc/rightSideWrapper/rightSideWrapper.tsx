import React from "react";

import OpacityAnimation from "hoc/opacityWrapper/opacityWrapper";

import styles from "./rightSideWrapper.module.scss";

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
}

const rightSideWrapper = (props: Props) => {
  return (
    <OpacityAnimation>
      <div className={styles.rightSideWrapper}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{props.title}</h1>
          {props.children}
        </div>
      </div>
    </OpacityAnimation>
  );
};

export default rightSideWrapper;
