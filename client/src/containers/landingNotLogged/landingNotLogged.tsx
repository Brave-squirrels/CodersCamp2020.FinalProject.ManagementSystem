import React, { FunctionComponent, useState } from "react";

import Input from "components/UI/formElements/input/input";
import Button from "components/UI/formElements/button/button";

const StartPage = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <Input
        type="text"
        placeholder="Name"
        inputValue={inputValue}
        onChangeInput={(e: { target: HTMLInputElement }) =>
          setInputValue(e.target.value)
        }
        label="Name"
      />
      <Button onSubmitButton={() => console.log("clicked")}>SIGN UP</Button>
    </>
  );
};

export default StartPage;
