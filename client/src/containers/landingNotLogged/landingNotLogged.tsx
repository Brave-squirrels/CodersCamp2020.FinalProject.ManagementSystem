import React, { FunctionComponent, useState } from "react";

import Input from "components/UI/formElements/input/input";

const StartPage: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <Input
        type="text"
        placeholder="Name"
        inputValue={inputValue}
        onChangeInput={(e: any) => setInputValue(e.target.value)}
        label="Name"
      />
    </>
  );
};

export default StartPage;
