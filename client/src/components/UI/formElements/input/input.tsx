import React, { FunctionComponent } from "react";
import styles from "./input.module.scss";

interface Props {
  type: string;
  placeholder: string;
  inputValue: string;
  onChangeInput: any;
  label: string;
  validity: boolean;
  touched: boolean;
}

const input: FunctionComponent<Props> = (props) => {
  let inputClasses: string[] = [styles.inputContainer];
  if (!props.validity && props.touched) {
    inputClasses = [styles.inputContainer, styles.invalidInput];
  }

  return (
    <label className={inputClasses.join(" ")}>
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
