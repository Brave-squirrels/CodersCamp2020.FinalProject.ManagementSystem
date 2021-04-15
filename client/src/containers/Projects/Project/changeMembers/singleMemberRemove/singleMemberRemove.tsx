import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import ErrorHandler from "components/errorHandler/errorHandler";

import { updateMemberInProjectFetch } from "reduxState/projects/updateMember";
import { RootState } from "reduxState/store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./singleMembersRemove.module.scss";

interface Props {
  userName: string;
  userId: string;
  userRole: string;
}

const SingleMemberRemove = (props: Props) => {
  const dispatch = useDispatch();

  const removeMemberStages = useSelector(
    (state: RootState) => state.updateMemberInProject
  );
  const teamData = useSelector((state: RootState) => state.singleTeamData);

  const { teamId, projectId } = useParams<types.TParams>();
  const removeHandler = () => {
    const data = {
      member: {
        id: props.userId,
        name: props.userName,
        role: props.userRole,
      },
      delete: true,
    };
    dispatch(updateMemberInProjectFetch(teamId, projectId, data));
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.name}>{props.userName}</span>
      <div className={styles.roleWrapper}>
        <span className={styles.role}>{props.userRole}</span>
        {teamData.team.ownerId !== props.userId && (
          <FontAwesomeIcon
            icon={faTrash}
            className={styles.iconRemove}
            onClick={removeHandler}
          />
        )}
      </div>
      {removeMemberStages.error && (
        <ErrorHandler>{removeMemberStages.error.response.data}</ErrorHandler>
      )}
    </div>
  );
};

export default SingleMemberRemove;
