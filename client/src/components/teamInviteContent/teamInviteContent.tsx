import React from "react";
/* import { useDispatch } from "react-redux"; */

import Button from "../UI/formElements/button/button";
import ButtonDanger from "../UI/formElements/buttonDanger/buttonDanger";

/* import { RootState } from "reduxState/store"; */

import styles from "./teamInviteContent.module.scss";

interface Props {
  children: string;
  teamId: string;
}

const TeamInviteContent = (props: Props) => {
  /* const dispatch = useDispatch(); */

  const acceptHandler = () => {
    console.log(props.teamId);
  };

  const declineHandler = () => {
    console.log(props.teamId);
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.inviteTitle}>{props.children}</span>
      <Button clicked={acceptHandler}>Accept</Button>
      <ButtonDanger clicked={declineHandler}>Decline</ButtonDanger>
    </div>
  );
};

export default TeamInviteContent;
