import React from "react";
import { /* useDispatch, */ useSelector } from "react-redux";

import CardContainer from "components/UI/CardContainer/cardContainer";
import TeamInviteContent from "components/teamInviteContent/teamInviteContent";
import EmptyNotification from "components/UI/emptyNotification/emptyNotification";

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
          {reduxState.teamInvitation && reduxState.teamInvitation.length > 0 ? (
            reduxState.teamInvitation.map((el: any) => {
              return (
                <TeamInviteContent teamId={el.id} key={el.id}>
                  {el.name}
                </TeamInviteContent>
              );
            })
          ) : (
            <EmptyNotification>
              You don't have any invites yet
            </EmptyNotification>
          )}
        </div>
      </CardContainer>
    </div>
  );
};

export default TeamInvites;
