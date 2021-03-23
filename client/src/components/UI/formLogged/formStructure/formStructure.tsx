import React from "react";

import Input from "../input/input";
import Button from "../../formElements/button/button";
import FormTitle from "../../formElements/formTitle/formTitle";
import styles from "./formStructure.module.scss";
import onChangeForm from "utils/onChangeForm";

/* Props
    state - state with input config
    seState - setState callback function from useState
    btnText - text in submit form button
    formTitle - text in form title
    submitted - function on submit form
    children - JSX element optionally passed
*/
interface Props {
  state: any;
  setState: any;
  btnText: string;
  formTitle: string;
  submitted: any;
  children?: JSX.Element;
  checkPass: boolean;
}

const formStructure = (props: Props) => {
  let key: keyof typeof props.state;
  let elements = [];
  for (key in props.state) {
    elements.push({
      id: key,
      config: props.state[key],
    });
  }

  const onChangeInput = (
    event: { target: HTMLInputElement },
    inputType: keyof typeof props.state
  ) => {
    /* Mutate, save and valid state */
    onChangeForm(
      event,
      inputType,
      props.state,
      props.setState,
      props.checkPass
    );
  };

  const form = elements.map((input: any) => {
    return (
      <Input
        key={input.id}
        type={input.config.type}
        inputType={input.config.inputType}
        inputValue={input.config.val}
        onChangeInput={(e: { target: HTMLInputElement }) =>
          onChangeInput(e, input.id)
        }
        label={input.config.label}
        validity={input.config.valid}
        touched={input.config.touched}
        stateMain={props.state}
      />
    );
  });

  return (
    <form onSubmit={(event) => props.submitted(event)} className={styles.form}>
      <FormTitle>{props.formTitle}</FormTitle>
      {form} {props.children}{" "}
      <Button disabled={!props.state.formValid}>{props.btnText}</Button>
    </form>
  );
};

export default formStructure;
