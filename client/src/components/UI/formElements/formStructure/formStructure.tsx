import React from "react";

import Input from "../input/input";
import Button from "../button/button";
import FormTitle from "../formTitle/formTitle";

interface Props {
  state: any;
  onChangeHandler: any;
  btnText: string;
  formTitle: string;
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

  const form = elements.map((input: any) => {
    return (
      <Input
        key={input.id}
        type={input.config.type}
        inputType={input.config.inputType}
        placeholder={input.config.placeholder}
        inputValue={input.config.val}
        onChangeInput={(e: { target: HTMLInputElement }) =>
          props.onChangeHandler(e, input.id)
        }
        label={input.config.label}
        validity={input.config.valid}
        touched={input.config.touched}
        stateMain={props.state}
      />
    );
  });

  return (
    <>
      <FormTitle>{props.formTitle}</FormTitle>
      {form} <Button disabled={!props.state.formValid}>{props.btnText}</Button>
    </>
  );
};

export default formStructure;
