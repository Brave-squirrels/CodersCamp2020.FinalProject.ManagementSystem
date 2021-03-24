import React from "react";

import CardContainer from "components/UI/CardContainer/cardContainer";
import Square from "components/UI/square/square";

import styles from "./teamInvites.module.scss";

const teamInvites = () => {
  return (
    <div className={styles.wrapper}>
      <CardContainer title="Team Invites">
        <div className={styles.innerWrapper}>
          <Square>Invite 1</Square>
          <Square>Invite 1</Square>
          <Square>Invite 1</Square>
          <Square>Invite 1</Square>
          <Square>Invite 1</Square>
          <Square>Invite 1</Square>
          <Square>Invite 1</Square>
        </div>
      </CardContainer>
    </div>
  );
};

export default teamInvites;
