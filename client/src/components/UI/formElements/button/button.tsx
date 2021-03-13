import React, { FunctionComponent } from "react";

import styles from "./button.module.scss";

interface Props {
  children: string;
}

const button: FunctionComponent<Props> = (props) => {
  return (
    <button className={styles.button} type="submit">
      {props.children}
    </button>
  );
};

export default button;
