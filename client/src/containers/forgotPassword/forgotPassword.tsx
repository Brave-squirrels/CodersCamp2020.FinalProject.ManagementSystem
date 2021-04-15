import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import FormStructure from "components/UI/formElements/formStructure/formStructure";
import Button from "components/UI/formElements/button/button";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import Notification from "components/notification/notification";

import styles from "./forgotPassword.module.scss";
import checkMark from "../../assets/checkMark.svg";

import { sendChangePassword } from "reduxState/sendForgotPassword";
import { RootState } from "reduxState/store";

const ForgotPassword = () => {
  const history = useHistory();

  const reduxState = useSelector(
    (state: RootState) => state.sendForgotPassword
  );
  const dispatch = useDispatch();

  const [forgot, setForgot] = useState({
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
    formValid: false,
  });

  const goBackHandler = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    history.push("/");
  };

  /* Handle request */
  const sendResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: forgot.email.val,
    };
    dispatch(sendChangePassword(data));
  };

  return (
    <div className={styles.forgotContainer}>
      <div className={styles.goBackBtn}>
        <Button clicked={goBackHandler}>Go back</Button>
      </div>

       {reduxState.loading ? (
        <Spinner />
      ) : !reduxState.success ? (
        <FormStructure
          state={forgot}
          setState={setForgot}
          btnText="RESET"
          formTitle="Reset password"
          submitted={sendResetPassword}
          checkPass={false}
        />
      ) : (
        <form
          className={styles.notificationSuccess}
          onSubmit={(e) => goBackHandler(e)}
        >
          <Notification
            title="Link yo reset your password has been sent to your email account"
            subTitle="Please click on the link that has been sent to your email account to change your password."
            btnText="GO BACK"
            img={checkMark}
          />
        </form>
      )}

      {reduxState.error && (
        <ErrorHandler>{reduxState.error.response.data}</ErrorHandler>
      )}
    </div>
  );
};

export default ForgotPassword;
