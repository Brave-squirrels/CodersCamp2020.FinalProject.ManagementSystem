import React, { FunctionComponent, useState } from "react";

import Input from "components/UI/formElements/input/input";
import Button from "components/UI/formElements/button/button";
import FormTitle from "components/UI/formElements/formTitle/formTitle";

import styles from "./landingNotLogged.module.scss";

import signInTmp from "../../assets/signInTmp.svg";
import signUpTmp from "../../assets/signUpTmp.svg";

import validation from "utils/validation";

const StartPage: FunctionComponent = () => {
  /* Handle form state */
  const [formValidity, changeFormValidity] = useState({
    signUp: false,
    signIn: false,
  });
  const [inputValue, setInputValue] = useState({
    signUp: {
      name: {
        val: "",
        type: "text",
        placeholder: "Name",
        label: "Name",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 50,
        },
        valid: false,
      },
      email: {
        val: "",
        type: "email",
        placeholder: "E-mail",
        label: "E-mail",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 50,
        },
        valid: false,
      },
      password: {
        val: "",
        type: "password",
        placeholder: "********",
        label: "Password",
        validation: {
          required: true,
          minLength: 8,
          maxLength: 50,
        },
        valid: false,
      },
      confirmPassword: {
        val: "",
        type: "password",
        placeholder: "********",
        label: "Confirm Password",
        validation: {
          required: true,
          minLength: 8,
          maxLength: 50,
        },
        valid: false,
      },
    },
    signIn: {
      email: {
        val: "",
        type: "email",
        placeholder: "E-mail",
        label: "E-mail",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 50,
        },
        valid: false,
      },
      password: {
        val: "",
        type: "password",
        placeholder: "********",
        label: "Password",
        validation: {
          required: true,
          minLength: 8,
          maxLength: 50,
        },
        valid: false,
      },
    },
  });

  /* Handle animation */
  const [view, changeView] = useState(true);
  let classes;
  if (!view) {
    classes = [styles.container, styles.signUpMode];
  } else {
    classes = [styles.container];
  }

  /* Generate forms */
  const signUpElements = [];
  let signUpKey: keyof typeof inputValue.signUp;
  for (signUpKey in inputValue.signUp) {
    signUpElements.push({
      id: signUpKey,
      config: inputValue.signUp[signUpKey],
    });
  }

  let signUpForm = signUpElements.map((input) => {
    return (
      <Input
        key={input.id}
        type={input.config.type}
        placeholder={input.config.placeholder}
        inputValue={input.config.val}
        onChangeInput={(e: { target: HTMLInputElement }) =>
          onChangeInputHandler(e, "signUp", input.id)
        }
        label={input.config.label}
      />
    );
  });

  const signInElements = [];
  let signInKey: keyof typeof inputValue.signIn;
  for (signInKey in inputValue.signIn) {
    signInElements.push({
      id: signInKey,
      config: inputValue.signIn[signInKey],
    });
  }

  let signInForm = signInElements.map((input) => {
    return (
      <Input
        key={input.id}
        type={input.config.type}
        placeholder={input.config.placeholder}
        inputValue={input.config.val}
        onChangeInput={(e: { target: HTMLInputElement }) =>
          onChangeInputHandler(e, "signIn", input.id)
        }
        label={input.config.label}
      />
    );
  });

  /* On change input handler */
  const onChangeInputHandler = (
    e: { target: HTMLInputElement },
    formType: keyof typeof inputValue,
    inputType:
      | keyof typeof inputValue.signUp
      | keyof typeof inputValue.signIn
      | string
  ) => {
    const stateCopy = { ...inputValue };
    const state = JSON.parse(JSON.stringify(stateCopy[formType]));

    const inputField = {
      ...state[inputType],
    };

    let valid: boolean = validation(e.target.value, inputField.validation);

    setInputValue((prevState) => {
      const copyType = JSON.parse(JSON.stringify(prevState[formType]));
      return {
        ...prevState,
        [formType]: {
          ...prevState[formType],
          [inputType]: {
            ...copyType[inputType],
            val: e.target.value,
            valid: valid,
          },
        },
      };
    });

    let validForm = true;
    let key: keyof typeof state;
    for (key in state) {
      if (state[key].valid === false) {
        validForm = false;
        break;
      }
    }
    console.log(validForm);
    changeFormValidity((prevState) => ({
      ...prevState,
      [formType]: validForm,
    }));
  };

  return (
    <div className={classes.join(" ")}>
      <div className={styles.formContainer}>
        <div className={styles.signInSignUp}>
          <div className={styles.signUpForm}>
            <form
              onSubmit={() => console.log("submitted")}
              className={styles.form}
            >
              <FormTitle> Sign Up</FormTitle>

              {signUpForm}

              <Button disabled={!formValidity.signUp}>SIGN UP</Button>
            </form>
          </div>

          <div className={styles.signInForm}>
            <form
              onSubmit={() => console.log("submitted")}
              className={styles.form}
            >
              <FormTitle> Sign In</FormTitle>
              {signInForm}
              <Button disabled={!formValidity.signIn}>SIGN IN</Button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.panelsContainer}>
        <div className={styles.panelLeft}>
          <div className={styles.content}>
            <FormTitle>Don't have and account?</FormTitle>
            <Button clicked={() => changeView(false)}>Sign Up</Button>
          </div>

          <img src={signUpTmp} alt="SignUp" className={styles.image} />
        </div>
        <div className={styles.panelRight}>
          <div className={styles.content}>
            <FormTitle>One of us?</FormTitle>
            <Button clicked={() => changeView(true)}>Sign In</Button>
          </div>
          <img src={signInTmp} alt="SignIn" className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
