import React from "react";
import { /* useDispatch, */ useSelector } from "react-redux";

import CardContainer from "components/UI/CardContainer/cardContainer";
import TeamInviteContent from "components/teamInviteContent/teamInviteContent";

import { RootState } from "reduxState/store";

import styles from "./teamInvites.module.scss";

const TeamInvites = () => {
  /* const dispatch = useDispatch(); */
  const reduxState = useSelector(
    (state: RootState) => state.login.userInformation
  );

  return (
    <div className={styles.wrapper}>
      <CardContainer title="Team Invites">
        <div className={styles.innerWrapper}>
          {reduxState.teamInvitation
            ? reduxState.teamInvitation.map((el: any) => {
                return (
                  <TeamInviteContent teamId={el.id} key={el.id}>
                    {el.name}
                  </TeamInviteContent>
                );
              })
            : "No invites :/"}
        </div>
      </CardContainer>
    </div>
  );
};

export default TeamInvites;
