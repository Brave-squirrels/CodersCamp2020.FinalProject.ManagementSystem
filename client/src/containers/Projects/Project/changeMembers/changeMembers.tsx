import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as types from "utils/types";

import SingleMemberRemove from "./singleMemberRemove/singleMemberRemove";
import SingleMemberAdd from "./singleMemberAdd/singleMemberAdd";
import Spinner from "components/UI/Spinner/spinner";

import { RootState } from "reduxState/store";

import styles from "./changeMembers.module.scss";

const ChangeMembers = () => {
  const teamData = useSelector((state: RootState) => state.singleTeamData);
  const projectData = useSelector(
    (state: RootState) => state.singleProjectData
  );
  const projectMemberEdit = useSelector(
    (state: RootState) => state.updateMemberInProject
  );

  const [projectMembersId, setProjectMembersId] = useState([""]);

  useEffect(() => {
    const arr: string[] = projectData.project.members.map(
      (member: types.ProjectMember) => member.id
    );
    setProjectMembersId(arr);
  }, [projectData.project.members]);

  return (
    <div className={styles.wrapper}>
      {projectMemberEdit.loading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.membersWrapper}>
            <span className={styles.title}>Members</span>
            {projectData.project.members.length > 1 ? (
              <>
                {projectData.project.members
                  .filter(
                    (user: types.ProjectMember) =>
                      user.id !== localStorage.getItem("id")
                  )
                  .map((member: types.ProjectMember) => (
                    <SingleMemberRemove
                      key={member.id}
                      userName={member.name}
                      userId={member.id}
                      userRole={member.role}
                    />
                  ))}
              </>
            ) : (
              <span className={styles.emptyNotification}>
                Project don't have any members
              </span>
            )}
          </div>
          <div className={styles.addMembersWrapper}>
            <span className={styles.title}>Add members</span>
            {teamData.team.members
              .filter(
                (member: types.Member) =>
                  !projectMembersId.includes(member.userId)
              )
              .map((member: types.Member) => (
                <SingleMemberAdd
                  key={member.userId}
                  userName={member.userName}
                  userId={member.userId}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChangeMembers;
