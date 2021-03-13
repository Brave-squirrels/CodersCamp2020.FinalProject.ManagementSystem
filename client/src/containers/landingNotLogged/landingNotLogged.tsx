import React, { FunctionComponent, useState } from "react";

import Input from "components/UI/formElements/input/input";
import Button from "components/UI/formElements/button/button";

import styles from "./landingNotLogged.module.scss";

const StartPage: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className={styles.main}>
      <div className={styles.circle}></div>
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
    </div>
  );
};

export default StartPage;
