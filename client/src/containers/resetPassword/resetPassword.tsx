import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import FormStructure from "components/UI/formElements/formStructure/formStructure";
import Button from "components/UI/formElements/button/button";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import Notification from "components/notification/notification";

import styles from "./resetPassword.module.scss";
import checkMark from "../../assets/checkMark.svg";

import { changePasswordLanding } from "reduxState/changePasswordLoggedOut";
import { RootState } from "reduxState/store";

const ResetPassword = () => {
  const history = useHistory();
  const location = useLocation();

  const reduxState = useSelector(
    (state: RootState) => state.changePasswordLanding
  );

  const dispatch = useDispatch();

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

  /* Handle go back button */
  const goBackHandler = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    history.push("/");
  };

  /* Handle request */
  const sendChangePasswordMail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    const data = {
      password: password.password.val,
      confirmPassword: password.confirmPassword.val,
    };
    dispatch(changePasswordLanding(data, token));
  };

  /* Return statement */
  return (
    <div className={styles.forgotContainer}>
      <div className={styles.goBackBtn}>
        <Button clicked={goBackHandler}>Go back</Button>
      </div>

      {reduxState.loading ? (
        <Spinner />
      ) : reduxState.success ? (
        <form
          className={styles.notificationSuccess}
          onSubmit={(e) => goBackHandler(e)}
        >
          <Notification
            title="You have successfully reset your password"
            subTitle="Go back to the main page to sign in!"
            btnText="GO BACK"
            img={checkMark}
          />
        </form>
      ) : (
        <FormStructure
          state={password}
          setState={setPassword}
          btnText="SEND"
          formTitle="Change password"
          submitted={sendChangePasswordMail}
          checkPass={true}
        />
      )}
      {reduxState.error && (
        <ErrorHandler>{reduxState.error.response.data}</ErrorHandler>
      )}
    </div>
  );
};

export default ResetPassword;
