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
  inputType: string;
}

const input: FunctionComponent<Props> = (props) => {
  let inputClasses: string[] = [styles.inputContainer];
  if (!props.validity && props.touched) {
    inputClasses = [styles.inputContainer, styles.invalidInput];
  }

  let input;
  switch (props.inputType) {
    case "input":
      input = (
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
      break;
    case "textarea":
      input = (
        <label className={inputClasses.join(" ")}>
          <span className={styles.label}>{props.label}</span>

          <textarea
            className={[styles.input, styles.textarea].join(" ")}
            placeholder={props.placeholder}
            value={props.inputValue}
            onChange={props.onChangeInput}
          />
        </label>
      );
  }

  return <>{input}</>;
};

export default input;
