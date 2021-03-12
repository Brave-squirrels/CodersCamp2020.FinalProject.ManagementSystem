import React, { FunctionComponent } from "react";

import styles from "./button.module.scss";

interface Props {
  onSubmitButton: () => void;
}

const button: FunctionComponent<Props> = (props) => {
  return (
    <button className={styles.button} onClick={props.onSubmitButton}>
      {props.children}
    </button>
  );
};

export default button;
