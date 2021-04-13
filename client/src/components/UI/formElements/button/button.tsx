import React, { FunctionComponent } from "react";

import styles from "./button.module.scss";

interface Props {
  children: string;
  btnType?: string;
  clicked?: () => void;
  disabled?: boolean;
}

const button: FunctionComponent<Props> = (props: Props) => {
  let classes: string[];
  if (props.btnType) {
    classes = [styles.button, styles[props.btnType]];
  } else {
    classes = [styles.button];
  }
  return (
    <button
      className={classes.join(" ")}
      onClick={props.clicked}
      type="submit"
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;
