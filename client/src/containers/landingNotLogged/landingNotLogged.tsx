import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "components/UI/formElements/button/button";
import FormTitle from "components/UI/formElements/formTitle/formTitle";
import FormStructure from "components/UI/formElements/formStructure/formStructure";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";

import styles from "./landingNotLogged.module.scss";

import signInTmp from "../../assets/signInTmp.svg";
import signUpTmp from "../../assets/signUpTmp.svg";

import onChangeForm from "utils/onChangeForm";

import allActions from "reduxState/indexActions";

const StartPage = () => {
  const createState = useSelector((state: any) => state.createUserReducer);

  const dispatch: any = useDispatch();
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
    event: { target: HTMLInputElement },
    inputType: keyof typeof signUp
  ) => {
    /* Mutate and valid state */
    const { updatedFields, validForm } = onChangeForm(
      event,
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
    event: { target: HTMLInputElement },
    inputType: keyof typeof signIn
  ) => {
    /* Mutate and valid state */
    const { updatedFields, validForm } = onChangeForm(event, inputType, signIn);

    /* Set up new state */
    setSignIn((prevState) => {
      return {
        ...prevState,
        ...updatedFields,
        formValid: validForm,
      };
    });
  };

  /* Create user after submit */
  const createUserHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: any = {};
    let key: keyof typeof signUp;
    for (key in signUp) {
      if (key === "formValid") {
        break;
      }
      formData[key] = signUp[key].val;
    }
    dispatch(allActions.createUser(formData));
  };

  /* Login user after submit */
  const loginUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  /* Change content when API call */
  let signUpContent: JSX.Element = (
    <form
      onSubmit={(event) => createUserHandler(event)}
      className={styles.form}
    >
      <FormStructure
        state={signUp}
        onChangeHandler={onChangeSignUp}
        btnText="SIGN UP"
        formTitle="Sign Up"
      />
    </form>
  );

  if (createState.loading) {
    signUpContent = <Spinner />;
  }
  if (createState.success) {
    signUpContent = <FormTitle>Success! Check your email</FormTitle>;
  }
  return (
    <div className={classes.join(" ")}>
      <div className={styles.formContainer}>
        <div className={styles.signInSignUp}>
          <div className={styles.signUpForm}>
            {signUpContent}
            {createState.error ? (
              <ErrorHandler>{createState.error.response.data}</ErrorHandler>
            ) : null}
          </div>

          <div className={styles.signInForm}>
            <form
              onSubmit={(event) => loginUserHandler(event)}
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
