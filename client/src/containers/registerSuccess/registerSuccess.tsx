import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Notification from "../../components/notification/notification";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";

import mailIcon from "assets/mailIcon.svg";

import { sendEmailAgain } from "reduxState/sendVerifyAgain";

interface Props {
  email: string;
}

const RegisterSuccess = (props: Props) => {
  const reduxState = useSelector((state: any) => state.sendVerifyAgain);
  const dispatch = useDispatch();

  const data = {
    email: props.email,
  };
  const sendAgain = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(sendEmailAgain(data));
  };

  let content: JSX.Element = (
    <form onSubmit={(event) => sendAgain(event)}>
      <Notification
        title="A verification link has been sent to your email account"
        subTitle="Please click on the link that has been sent to your email account to verify your email and finish the registration process."
        btnText="SEND AGAIN"
        img={mailIcon}
      />
      {reduxState.error ? (
        <ErrorHandler> Something went wrong, try again!</ErrorHandler>
      ) : null}
    </form>
  );
  if (reduxState.loading) {
    content = <Spinner />;
  }

  return <>{content}</>;
};

export default RegisterSuccess;
