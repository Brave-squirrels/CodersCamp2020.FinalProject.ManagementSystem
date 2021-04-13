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
  turnOff?: boolean;
  minLength?: number;
  maxLength?: number;
}

const input: FunctionComponent<Props> = (props) => {
  let inputClasses: string[] = [styles.inputContainer];
  if (!props.validity && props.touched) {
    inputClasses = [styles.inputContainer, styles.invalidInput];
  }

  if (props.validity) {
    inputClasses = [styles.inputContainer, styles.inputTouched];
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
            disabled={props.turnOff}
            minLength={props.minLength}
            maxLength={props.maxLength}
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
            disabled={props.turnOff}
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
            className={[styles.input, styles.select].join(" ")}
            disabled={props.turnOff}
            required
          >
            {selectOptions.map((option) => {
              return (
                <option
                  value={option.val}
                  key={option.val}
                  className={styles.option}
                >
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
