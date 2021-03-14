import React, { FunctionComponent } from "react";

import styles from "./button.module.scss";

interface Props {
  children: string;
  clicked?: () => void;
  disabled?: boolean;
}

const button: FunctionComponent<Props> = (props: any) => {
  return (
    <button
      className={[styles.button, styles[props.btnType]].join(" ")}
      onClick={props.clicked}
      type="submit"
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;
