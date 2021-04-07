import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as types from "utils/types";

import AlignVert from "hoc/alignVert/alignVert";
import SingleMemberRemove from "./singleMemberRemove/singleMemberRemove";
import SingleMemberAdd from "./singleMemberAdd/singleMemberAdd";

import { RootState } from "reduxState/store";

import styles from "./changeMembers.module.scss";

const ChangeMembers = () => {
  const teamData = useSelector((state: RootState) => state.singleTeamData);
  const projectData = useSelector(
    (state: RootState) => state.singleProjectData
  );

  const [projectMembersId, setProjectMembersId] = useState([""]);

  useEffect(() => {
    const arr: string[] = projectData.project.members.map(
      (member: types.ProjectMember) => member.id
    );
    setProjectMembersId(arr);
  }, [projectData.project.members]);

  return (
    <AlignVert>
      <div className={styles.membersWrapper}>
        <span>Members</span>
        {projectData.project.members
          .filter(
            (user: types.ProjectMember) =>
              user.id !== localStorage.getItem("id")
          )
          .map((member: types.ProjectMember) => (
            <SingleMemberRemove
              userName={member.name}
              userId={member.id}
              userRole={member.role}
              key={member.id}
            />
          ))}
      </div>
      <div className={styles.addMembersWrapper}>
        <span>Add members</span>
        {teamData.team.members
          .filter(
            (member: types.Member) => !projectMembersId.includes(member.userId)
          )
          .map((member: types.Member) => (
            <SingleMemberAdd
              userName={member.userName}
              userId={member.userId}
              key={member.userId}
            />
          ))}
      </div>
    </AlignVert>
  );
};

export default ChangeMembers;
