import React from "react";

import Input from "../input/input";

interface Props {
  state: any;
  onChangeHandler: any;
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
      />
    );
  });

  return <>{form}</>;
};

export default formStructure;
