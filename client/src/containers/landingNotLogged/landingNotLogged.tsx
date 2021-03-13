import React, { FunctionComponent, useState } from "react";

import Input from "components/UI/formElements/input/input";
import Button from "components/UI/formElements/button/button";
import FormTitle from "components/UI/formElements/formTitle/formTitle";

import styles from "./landingNotLogged.module.scss";

import signInTmp from "../../assets/signInTmp.svg";
import signUpTmp from "../../assets/signUpTmp.svg";

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

  const [view, changeView] = useState(true);
  let classes;
  if (!view) {
    classes = [styles.container, styles.signUpMode];
  } else {
    classes = [styles.container];
  }

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
          </div>

          <div className={styles.signInForm}>
            <form
              onSubmit={() => console.log("submitted")}
              className={styles.form}
            >
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
        </div>
      </div>

      <div className={styles.panelsContainer}>
        <div className={styles.panelLeft}>
          <div className={styles.content}>
            <FormTitle>Don't have and account?</FormTitle>
            <Button clicked={() => changeView(false)}>Sign Up</Button>
          </div>

          <img src={signUpTmp} alt="" className={styles.image} />
        </div>
        <div className={styles.panelRight}>
          <div className={styles.content}>
            <FormTitle>One of us?</FormTitle>
            <Button clicked={() => changeView(true)}>Sign In</Button>
          </div>
          <img src={signInTmp} alt="" className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
