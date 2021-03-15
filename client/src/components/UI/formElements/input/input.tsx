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
    for (let key in props.stateMain.select.options) {
      selectOptions.push(props.stateMain.select.options[key]);
    }
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
      break;
    case "select":
      input = (
        <label className={inputClasses.join(" ")}>
          <span className={styles.label}>{props.label}</span>
          <select
            name={props.name}
            value={props.inputValue}
            onChange={props.onChangeInput}
            className={styles.select}
          >
            {selectOptions.map((option) => {
              return (
                <option value={option.val} key={option.val}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </label>
      );
      break;
  }

  return <>{input}</>;
};

export default input;
