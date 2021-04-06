import React, { useState } from "react";
import styles from "./changeModerator.module.scss";
import { useSelector } from "react-redux";


import axios from "axios/axiosMain";

const ChangeModerator = () => {
  const state = useSelector((state: any) => state.singleTeamData);
  const ownerId = state.team.ownerId;
  const moderatorsIdList = state.team.moderatorsId;
  const membersArr = state.team.members;
  const teamId = state.team._id;

  const noModeratorsArr = membersArr.filter(
    (member: any) => !moderatorsIdList.includes(member.userId)
  );

  const moderatorsArr = membersArr
    .filter((member: any) => moderatorsIdList.includes(member.userId))
    .filter((moderator: any) => moderator.userId !== ownerId);


  const [noModerators, setNoModerators] = useState([...noModeratorsArr])
  const [moderators, setModerators] = useState([...moderatorsArr])

  const addPermission = (user: any) => {
    const formatData = { id: user.userId }
    axios
      .put(`/teams/${teamId}/addPermissions`, formatData, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then(() => {
        setNoModerators(noModerators.filter((member: any) => user.userId !== member.userId))
        setModerators([...moderators, user])
        console.log('Success!')
      })
      .catch((err) => console.log('Something went wrong!'));
  }

  const removePermission = (user: any) => {
    const formatData = { id: user.userId }
    axios
      .put(`/teams/${teamId}/removePermissions`, formatData, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then(() => {
        setModerators(moderators.filter((member: any) => user.userId !== member.userId))
        setNoModerators([...noModerators, user])
        console.log('Success!')
      })
      .catch((err) => console.log('Something went wrong!'));
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.moderators}>
        <h2>Moderators</h2>
        {moderators.map((moderator: any) => (
          <div className={styles.moderator} key={moderator.userId}>
            <div>{moderator.userName}</div>
            <div
              onClick={() => removePermission(moderator)}
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
              onClick={() => addPermission(member)}
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
