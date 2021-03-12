import React, { FunctionComponent } from "react";
import styles from "./input.module.scss";

interface Props {
  type: string;
  placeholder: string;
  inputValue: string;
  onChangeInput: (e: { target: HTMLInputElement }) => void;
  label: string;
}

const input: FunctionComponent<Props> = (props) => {
  return (
    <label className={styles.inputContainer}>
      <span className={styles.label}>{props.label}</span>

      <input
        className={styles.input}
        type={props.type}
        placeholder={props.placeholder}
        value={props.inputValue}
        onChange={props.onChangeInput}
      />
    </label>
  );
};

export default input;
