import React from "react";

import CardContainer from "components/UI/CardContainer/cardContainer";
import Square from "components/UI/square/square";

import styles from "./teamInvites.module.scss";

const teamInvites = () => {
  return (
    <div className={styles.wrapper}>
      <CardContainer title="Team Invites">
        <Square>Invite 1</Square>
      </CardContainer>
    </div>
  );
};

export default teamInvites;
