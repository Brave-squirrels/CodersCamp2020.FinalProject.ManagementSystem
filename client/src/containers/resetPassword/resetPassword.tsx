import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import FormStructure from "components/UI/formElements/formStructure/formStructure";
import Button from "components/UI/formElements/button/button";

import onChangeForm from "utils/onChangeForm";
import axios from "axios/axiosMain";

import styles from "./resetPassword.module.scss";

const ResetPassword = () => {
  const history = useHistory();
  const location = useLocation();

  /* Set input states */
  const [password, setPassword] = useState({
    password: {
      val: "",
      type: "password",
      inputType: "input",
      placeholder: "********",
      label: "New password",
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

  /* Handle input change and validation  */
  const onChangePassword = (
    event: { target: HTMLInputElement },
    inputType: keyof typeof password
  ) => {
    /* Mutate and valid state */
    const { updatedFields, validForm } = onChangeForm(
      event,
      inputType,
      password,
      true
    );

    /* Set up new state */
    setPassword((prevState) => {
      return {
        ...prevState,
        ...updatedFields,
        formValid: validForm,
      };
    });
  };

  /* Handle go back button */
  const goBackHandler = () => {
    history.push("/");
  };

  /* Handle request */
  const sendChangePasswordMail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    console.log(token);
    const data = {
      password: password.password.val,
      confirmPassword: password.confirmPassword.val,
    };
    axios.put("/users/password", data, {
      headers: {
        "x-auth-token": `${token}`,
      },
    });
  };

  /* Return statement */
  return (
    <div className={styles.forgotContainer}>
      <div className={styles.goBackBtn}>
        <Button clicked={goBackHandler}>Go back</Button>
      </div>

      <form
        onSubmit={(e) => sendChangePasswordMail(e)}
        className={styles.formStyles}
      >
        <FormStructure
          state={password}
          onChangeHandler={onChangePassword}
          btnText="SEND"
          formTitle="Change password"
        />
      </form>
    </div>
  );
};

export default ResetPassword;
