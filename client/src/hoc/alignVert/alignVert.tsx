import React from "react";

import styles from "./alignVert.module.scss";

interface Props {
  children: JSX.Element | JSX.Element[] | string;
}

const alignVert = (props: Props) => {
  return <div className={styles.alignWrapper}>{props.children}</div>;
};

export default alignVert;
