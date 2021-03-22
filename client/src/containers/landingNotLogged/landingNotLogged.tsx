import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import Button from "components/UI/formElements/button/button";
import FormTitle from "components/UI/formElements/formTitle/formTitle";
import FormStructure from "components/UI/formElements/formStructure/formStructure";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import RegisterSuccess from "containers/registerSuccess/registerSuccess";

import styles from "./landingNotLogged.module.scss";

import signInTmp from "../../assets/signInTmp.svg";
import signUpTmp from "../../assets/signUpTmp.svg";

import onChangeForm, { mutateToAxios } from "utils/onChangeForm";

import { createUser } from "reduxState/createUserSlice";
import { loginUser } from "reduxState/loginSlice";
import { RootState } from "reduxState/store";

const StartPage = () => {
  const signUpState = useSelector((state: RootState) => state.createUser);

  const signInState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
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
    const formData = mutateToAxios(signUp);

    dispatch(createUser(formData));
  };

  /* Login user after submit */
  const loginUserHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = mutateToAxios(signIn);

    dispatch(loginUser(formData));
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

  if (signUpState.loading) {
    signUpContent = <Spinner />;
  }
  if (signUpState.success) {
    signUpContent = <RegisterSuccess email={signUp.email.val} />;
  }

  let signInContent: JSX.Element = (
    <FormStructure
      state={signIn}
      onChangeHandler={onChangeSignIn}
      btnText="SIGN IN"
      formTitle="Sign In"
    >
      <NavLink to="/forgotpassword" exact className={styles.forgotLink}>
        Forgot password?
      </NavLink>
    </FormStructure>
  );

  if (signInState.loading) {
    signInContent = <Spinner />;
  }
  return (
    <div className={classes.join(" ")}>
      <div className={styles.formContainer}>
        <div className={styles.signInSignUp}>
          <div className={styles.signUpForm}>
            {signUpContent}
            {signUpState.error ? (
              <ErrorHandler>{signUpState.error.response.data}</ErrorHandler>
            ) : null}
          </div>

          <div className={styles.signInForm}>
            <form
              onSubmit={(event) => loginUserHandler(event)}
              className={styles.form}
            >
              {signInContent}
              {signInState.error ? (
                <ErrorHandler>{signInState.error.response.data}</ErrorHandler>
              ) : null}
            </form>
          </div>
        </div>
      </div>

      <div className={styles.panelsContainer}>
        <div className={styles.panelLeft}>
          <div className={styles.content}>
            <FormTitle>Don't have an account?</FormTitle>
            <Button clicked={() => changeView(false)}>Sign Up</Button>
          </div>

          <img src={signUpTmp} alt="SignUp" className={styles.image} />
        </div>
        <div className={styles.panelRight} id={styles.rightId}>
          <div className={styles.content}>
            <FormTitle>One of us?</FormTitle>
            <Button
              clicked={() => changeView(true)}
              disabled={view}
              btnType="disable"
            >
              Sign In
            </Button>
          </div>
          <img src={signInTmp} alt="SignIn" className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
