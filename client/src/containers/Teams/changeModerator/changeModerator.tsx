import React from "react";
import styles from "./changeModerator.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "reduxState/store";

const ChangeModerator = () => {
  const state = useSelector((state: RootState) => state.singleTeamData);
  const ownerId = state.team.ownerId;
  const moderatorsIdList = state.team.moderatorsId;
  const membersArr =  state.team.members;

  const noModerators = membersArr.filter(
    (member: any) => !moderatorsIdList.includes(member.userId)
  );
  const moderators = membersArr
    .filter((member: any) => moderatorsIdList.includes(member.userId))
    .filter((moderator: any) => moderator.userId !== ownerId);

  const clickHandler = (moderatorId: string) => {
    console.log(moderatorId);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.moderators}>
        <h2>Moderators</h2>
        {moderators.map((moderator: any) => (
          <div className={styles.moderator} key={moderator.userId}>
            <div>{moderator.userName}</div>
            <div
              onClick={() => clickHandler(moderator.userId)}
              className={styles.degrade}
            >
              Degrade
            </div>
          </div>
        ))}
      </div>
      <div className={styles.members}>
        <h2>Members</h2>
        {noModerators.map((member: any) => (
          <div key={member.userId}>
            <div>{member.userName}</div>
            <div
              onClick={() => clickHandler(member.userId)}
              className={styles.promote}
            >
              Promote
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChangeModerator;
