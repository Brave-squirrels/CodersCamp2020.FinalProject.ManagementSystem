import React from "react";

import CardContainer from "components/UI/CardContainer/cardContainer";
import Square from "components/UI/square/square";
import TeamInviteContent from "components/teamInviteContent/teamInviteContent";

import styles from "./teamInvites.module.scss";

const teamInvites = () => {
  return (
    <div className={styles.wrapper}>
      <CardContainer title="Team Invites">
        <div className={styles.innerWrapper}>
          <Square>
            <TeamInviteContent teamId={"xd"}>Team 1</TeamInviteContent>
          </Square>
          <Square>
            <TeamInviteContent teamId={"xd"}>Team 2</TeamInviteContent>
          </Square>
          <Square>
            <TeamInviteContent teamId={"xd"}>Team 3</TeamInviteContent>
          </Square>
        </div>
      </CardContainer>
    </div>
  );
};

export default teamInvites;
