import React from "react";

import Button from "../UI/formElements/button/button";
import ButtonDanger from "../UI/formElements/buttonDanger/buttonDanger";
import Square from "components/UI/square/square";

import styles from "./teamInviteContent.module.scss";

interface Props {
  children: string;
  teamId: string;
}

const TeamInviteContent = (props: Props) => {
  return (
    <Square>
      <div className={styles.wrapper}>
        <span className={styles.inviteTitle}>{props.children}</span>
        <Button>Accept</Button>
        <ButtonDanger>Decline</ButtonDanger>
      </div>
    </Square>
  );
};

export default TeamInviteContent;
