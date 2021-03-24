import React from "react";

import CardContainer from "components/UI/CardContainer/index";

import styles from "./teamInvites.module.scss";

const teamInvites = () => {
  return (
    <div className={styles.wrapper}>
      <CardContainer title="Team Invites">Team invites</CardContainer>
    </div>
  );
};

export default teamInvites;
