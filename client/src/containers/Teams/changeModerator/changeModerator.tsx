import React from "react";
import styles from "./changeModerator.module.scss";

const ChangeModerator = ({ team }: any) => {
  const ownerId = team.ownerId;
  const moderatorsIdList = team.moderatorsId
  const membersArr = team.members;

  const noModerators = membersArr.filter(
    (member: any) => !moderatorsIdList.includes(member.userId)
  );
  const moderators = membersArr.filter((member: any) =>
    moderatorsIdList.includes(member.userId)
  ).filter(
    (moderator: any) => moderator.userId !== ownerId
  );

  const clickHandler = (moderatorId: string) => {
    console.log(moderatorId);
  };

  return (
    <div className="styles.wrapper">
      {noModerators.map((member: any) => (
        <div onClick={() => clickHandler(member.userId)} key={member.userId}>
          {member.userName}
        </div>
      ))}
      <hr />
      {moderators.map((moderator: any) => (
        <div
          onClick={() => clickHandler(moderator.userId)}
          key={moderator.userId}
        >
          {moderator.userName}
        </div>
      ))}
    </div>
  );
};
export default ChangeModerator;
