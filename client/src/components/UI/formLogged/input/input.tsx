import React, { FunctionComponent } from "react";
import styles from "./input.module.scss";

interface Props {
  type: string;
  inputValue: string;
  onChangeInput: any;
  label: string;
  validity: boolean;
  touched: boolean;
  inputType: string;
  stateMain?: any;
  name?: string;
}

const input: FunctionComponent<Props> = (props) => {
  let inputClasses: string[] = [styles.inputContainer];
  if (!props.validity && props.touched) {
    inputClasses = [styles.inputContainer, styles.invalidInput];
  }

  let selectOptions = [];
  if (props.inputType === "select") {
    for (let key in props.stateMain.status.options) {
      selectOptions.push(props.stateMain.status.options[key]);
    }
  }

  let input;
  switch (props.inputType) {
    case "input":
      input = (
        <label className={inputClasses.join(" ")}>
          <input
            className={styles.input}
            type={props.type}
            value={props.inputValue}
            onChange={props.onChangeInput}
            required
          />
          <span className={styles.label}>{props.label}</span>
        </label>
      );
      break;
    case "textarea":
      input = (
        <label className={inputClasses.join(" ")}>
          <textarea
            className={[styles.input, styles.textarea].join(" ")}
            value={props.inputValue}
            onChange={props.onChangeInput}
            required
          />
          <span className={styles.label}>{props.label}</span>
        </label>
      );
      break;
    case "select":
      input = (
        <label className={inputClasses.join(" ")}>
          <select
            name={props.name}
            value={props.inputValue}
            onChange={props.onChangeInput}
            className={[styles.select, styles.input].join(" ")}
            required
          >
            {selectOptions.map((option) => {
              return (
                <option value={option.val} key={option.val}>
                  {option.name}
                </option>
              );
            })}
          </select>
          <span className={styles.label}>{props.label}</span>
        </label>
      );
      break;
  }

  return <>{input}</>;
};

export default input;