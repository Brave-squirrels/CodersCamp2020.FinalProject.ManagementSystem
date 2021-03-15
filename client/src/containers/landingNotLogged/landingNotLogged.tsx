import React, { FunctionComponent, useState } from "react";

import Button from "components/UI/formElements/button/button";
import FormTitle from "components/UI/formElements/formTitle/formTitle";

import styles from "./landingNotLogged.module.scss";

import signInTmp from "../../assets/signInTmp.svg";
import signUpTmp from "../../assets/signUpTmp.svg";

import onChangeForm from "utils/onChangeForm";

import FormStructure from "components/UI/formElements/formStructure/formStructure";

const StartPage: FunctionComponent = () => {
  /* Handle form state */
  const [signIn, setSignIn] = useState({
    email: {
      val: "",
      type: "email",
      inputType: "input",
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
      inputType: "input",
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
    formValid: false,
  });

  const [signUp, setSignUp] = useState({
    name: {
      val: "",
      type: "text",
      inputType: "input",
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
      inputType: "input",
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
      inputType: "input",
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
      inputType: "input",
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
    formValid: false,
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
    /* Mutate and valid state */
    const { updatedFields, validForm } = onChangeForm(
      e,
      inputType,
      signUp,
      true
    );

    /* Set up new state */
    setSignUp((prevState) => {
      return {
        ...prevState,
        ...updatedFields,
        formValid: validForm,
      };
    });
  };

  /* Handle changes in signIn form */
  const onChangeSignIn = (
    e: { target: HTMLInputElement },
    inputType: keyof typeof signIn
  ) => {
    /* Mutate and valid state */
    const { updatedFields, validForm } = onChangeForm(e, inputType, signIn);

    /* Set up new state */
    setSignIn((prevState) => {
      return {
        ...prevState,
        ...updatedFields,
        formValid: validForm,
      };
    });
  };

  return (
    <div className={classes.join(" ")}>
      <div className={styles.formContainer}>
        <div className={styles.signInSignUp}>
          <div className={styles.signUpForm}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(signUp);
              }}
              className={styles.form}
            >
              <FormStructure
                state={signUp}
                onChangeHandler={onChangeSignUp}
                btnText="SIGN UP"
                formTitle="Sign In"
              />
            </form>
          </div>

          <div className={styles.signInForm}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(signIn);
              }}
              className={styles.form}
            >
              <FormStructure
                state={signIn}
                onChangeHandler={onChangeSignIn}
                btnText="SIGN IN"
                formTitle="Sign In"
              />
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
