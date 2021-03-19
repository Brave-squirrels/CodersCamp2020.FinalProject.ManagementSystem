import React from "react";

import Notification from "../../components/notification/notification";

import mailIcon from "assets/mailIcon.svg";

import axios from "axios/axiosMain";

interface Props {
  email: string;
}

const registerSuccess = (props: Props) => {
  const data = {
    email: props.email,
  };
  const sendAgain = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post("/users/email", data);
  };

  return (
    <form onSubmit={(event) => sendAgain(event)}>
      <Notification
        title="A verification link has been sent to your email account"
        subTitle="Please click on the link that has been sent to your email account to verify your email and finish the registration process."
        btnText="SEND AGAIN"
        img={mailIcon}
      />
    </form>
  );
};

export default registerSuccess;
