import React, { FunctionComponent, useState } from "react";

import Input from "components/UI/formElements/input/input";
import Button from "components/UI/formElements/button/button";
import FormTitle from "components/UI/formElements/formTitle/formTitle";

import styles from "./landingNotLogged.module.scss";

import signInTmp from "../../assets/signInTmp.svg";
import signUpTmp from "../../assets/signUpTmp.svg";

import { validation, wholeFormValidity } from "utils/validation";
import mutateState from "utils/mutateFormState";

const StartPage: FunctionComponent = () => {
  /* Handle form state */
  const [formValidity, changeFormValidity] = useState({
    signUp: false,
    signIn: false,
  });
  const [signIn, setSignIn] = useState({
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
      touched: false,
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
      touched: false,
      valid: false,
    },
  });

  const [signUp, setSignUp] = useState({
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
      touched: false,
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
      touched: false,
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
      touched: false,
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
      touched: false,
      valid: false,
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

  /* SignUp form elements */
  const signUpElements = [];
  let signUpKey: keyof typeof signUp;
  for (signUpKey in signUp) {
    signUpElements.push({
      id: signUpKey,
      config: signUp[signUpKey],
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
          onChangeFormHandler(e, "signUp", input.id)
        }
        label={input.config.label}
        validity={input.config.valid}
        touched={input.config.touched}
      />
    );
  });

  /* SignIn form elements */
  const signInElements = [];
  let signInKey: keyof typeof signIn;
  for (signInKey in signIn) {
    signInElements.push({
      id: signInKey,
      config: signIn[signInKey],
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
          onChangeFormHandler(e, "signIn", input.id)
        }
        label={input.config.label}
        validity={input.config.valid}
        touched={input.config.touched}
      />
    );
  });

  /* Handle changes in both forms */
  const onChangeFormHandler = (
    e: { target: HTMLInputElement },
    stateType: string,
    inputType: keyof typeof signIn | keyof typeof signUp
  ) => {
    /* Make copy of state */
    let stateCopy;
    let passwordCheck: boolean;
    if (stateType === "signUp") {
      stateCopy = { ...signUp };
      passwordCheck = true;
    } else {
      passwordCheck = false;
      stateCopy = { ...signIn };
    }
    const inputField: any = {
      ...stateCopy[inputType],
    };

    /* Check if data is valid */
    let valid: boolean = validation(e.target.value, inputField.validation);

    /* Mutate state */
    const updatedFields = mutateState(
      e,
      inputType,
      stateCopy,
      valid,
      passwordCheck
    );

    /* Check if whole form is valid */
    const validForm = wholeFormValidity(updatedFields);

    /* Set up new state */
    if (stateType === "signUp") {
      setSignUp((prevState) => {
        return {
          ...prevState,
          ...updatedFields,
        };
      });
      /* Update form validity */
      changeFormValidity((prevState) => ({
        ...prevState,
        signUp: validForm,
      }));
    }
    if (stateType === "signIn") {
      setSignIn((prevState) => {
        return {
          ...prevState,
          ...updatedFields,
        };
      });
      /* Update form validity */
      changeFormValidity((prevState) => ({
        ...prevState,
        signIn: validForm,
      }));
    }
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
