import React, { FunctionComponent, useState } from "react";

import Input from "components/UI/formElements/input/input";
import Button from "components/UI/formElements/button/button";
import FormTitle from "components/UI/formElements/formTitle/formTitle";

import styles from "./landingNotLogged.module.scss";

const StartPage: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState({
    signUp: {
      nameValue: "",
      emailValue: "",
      passwordValue: "",
      confirmPasswordValue: "",
    },
    signIn: {
      emailValue: "",
      passwordValue: "",
    },
  });

  return (
    <div className={styles.main}>
      <form onSubmit={() => console.log("submitted")} className={styles.form}>
        <FormTitle> Sign Up</FormTitle>
        <Input
          type="text"
          placeholder="Name"
          inputValue={inputValue.signUp.nameValue}
          onChangeInput={(e: { target: HTMLInputElement }) =>
            setInputValue((prevState) => ({
              ...prevState,
              signUp: {
                ...prevState.signUp,
                nameValue: e.target.value,
              },
            }))
          }
          label="Name"
        />
        <Input
          type="email"
          placeholder="E-mail"
          inputValue={inputValue.signUp.emailValue}
          onChangeInput={(e: { target: HTMLInputElement }) =>
            setInputValue((prevState) => ({
              ...prevState,
              signUp: {
                ...prevState.signUp,
                emailValue: e.target.value,
              },
            }))
          }
          label="E-mail"
        />
        <Input
          type="password"
          placeholder="********"
          inputValue={inputValue.signUp.passwordValue}
          onChangeInput={(e: { target: HTMLInputElement }) =>
            setInputValue((prevState) => ({
              ...prevState,
              signUp: {
                ...prevState.signUp,
                passwordValue: e.target.value,
              },
            }))
          }
          label="Password"
        />
        <Input
          type="password"
          placeholder="*******"
          inputValue={inputValue.signUp.confirmPasswordValue}
          onChangeInput={(e: { target: HTMLInputElement }) =>
            setInputValue((prevState) => ({
              ...prevState,
              signUp: {
                ...prevState.signUp,
                confirmPasswordValue: e.target.value,
              },
            }))
          }
          label="Confirm Password"
        />

        <Button>SIGN UP</Button>
      </form>

      <form onSubmit={() => console.log("submitted")} className={styles.form}>
        <FormTitle> Sign In</FormTitle>
        <Input
          type="email"
          placeholder="E-mail"
          inputValue={inputValue.signIn.emailValue}
          onChangeInput={(e: { target: HTMLInputElement }) =>
            setInputValue((prevState) => ({
              ...prevState,
              signIn: {
                ...prevState.signIn,
                emailValue: e.target.value,
              },
            }))
          }
          label="E-mail"
        />
        <Input
          type="password"
          placeholder="********"
          inputValue={inputValue.signIn.passwordValue}
          onChangeInput={(e: { target: HTMLInputElement }) =>
            setInputValue((prevState) => ({
              ...prevState,
              signIn: {
                ...prevState.signIn,
                passwordValue: e.target.value,
              },
            }))
          }
          label="Password"
        />
        <Button>SIGN IN</Button>
      </form>
    </div>
  );
};

export default StartPage;
