import React, { FunctionComponent, useState } from "react";

import Button from "components/UI/formElements/button/button";
import FormTitle from "components/UI/formElements/formTitle/formTitle";

import styles from "./landingNotLogged.module.scss";

import signInTmp from "../../assets/signInTmp.svg";
import signUpTmp from "../../assets/signUpTmp.svg";

import { validation, wholeFormValidity } from "utils/validation";
import mutateState from "utils/mutateFormState";

import FormStructure from "components/UI/formElements/formStructure/formStructure";

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

  /* Handle changes in signUp form */
  const onChangeSignUp = (
    e: { target: HTMLInputElement },
    inputType: keyof typeof signUp
  ) => {
    /* Make copy of state */

    const stateCopy = { ...signUp };

    const inputField = {
      ...stateCopy[inputType],
    };

    /* Check if data is valid */
    let valid: boolean = validation(e.target.value, inputField.validation);

    /* Mutate state */
    const updatedFields = mutateState(e, inputType, stateCopy, valid, true);

    /* Check if whole form is valid */
    const validForm = wholeFormValidity(updatedFields);

    /* Set up new state */

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
  };

  /* Handle changes in signIn form */
  const onChangeSignIn = (
    e: { target: HTMLInputElement },
    inputType: keyof typeof signIn
  ) => {
    /* Make copy of state */

    const stateCopy = { ...signIn };

    const inputField = {
      ...stateCopy[inputType],
    };

    /* Check if data is valid */
    let valid: boolean = validation(e.target.value, inputField.validation);

    /* Mutate state */
    const updatedFields = mutateState(e, inputType, stateCopy, valid);

    /* Check if whole form is valid */
    const validForm = wholeFormValidity(updatedFields);

    /* Set up new state */

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

              {/* {signUpForm} */}
              <FormStructure state={signUp} onChangeHandler={onChangeSignUp} />

              <Button disabled={!formValidity.signUp}>SIGN UP</Button>
            </form>
          </div>

          <div className={styles.signInForm}>
            <form
              onSubmit={() => console.log("submitted")}
              className={styles.form}
            >
              <FormTitle> Sign In</FormTitle>
              {/* {signInForm} */}
              <FormStructure state={signIn} onChangeHandler={onChangeSignIn} />
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
