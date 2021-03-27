import React from "react";

import Button from "../UI/formElements/button/button";
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
        <Button btnType="danger">Decline</Button>
      </div>
    </Square>
  );
};

export default TeamInviteContent;
