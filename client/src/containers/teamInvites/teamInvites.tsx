import React from "react";
import { useSelector } from "react-redux";
import * as types from "utils/types";

import CardContainer from "components/UI/CardContainer/cardContainer";
import TeamInviteContent from "./teamInviteContent/teamInviteContent";
import EmptyNotification from "components/UI/emptyNotification/emptyNotification";

import { RootState } from "reduxState/store";

import styles from "./teamInvites.module.scss";

const TeamInvites = () => {
  const reduxState = useSelector(
    (state: RootState) => state.login.userInformation
  );

  return (
    <div className={styles.wrapper}>
      <CardContainer title="Team Invites">
        <div className={styles.innerWrapper}>
          {reduxState.teamInvitation && reduxState.teamInvitation.length > 0 ? (
            reduxState.teamInvitation.map((invite: types.Invite) => {
              return (
                <TeamInviteContent teamId={invite.teamId} key={invite.teamId}>
                  {invite.teamName}
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
