import React from "react";

import styles from "./changeButton.module.scss";

interface Props {
  clicked: () => void;
  title?: string;
}

const changeButton = (props: Props) => {
  return (
    <div className={styles.wrapper} onClick={props.clicked}>
      {props.title}
    </div>
  );
};

export default changeButton;
