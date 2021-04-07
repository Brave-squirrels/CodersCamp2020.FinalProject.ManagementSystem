import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import Spinner from "components/UI/Spinner/spinner";
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
    <div>
      {removeMemberStages.loading ? (
        <Spinner />
      ) : (
        <>
          <span>{props.userName}</span>
          <span>{props.userRole}</span>
          <FontAwesomeIcon
            icon={faTrash}
            className={styles.iconRemove}
            onClick={removeHandler}
          />
        </>
      )}
      {removeMemberStages.error && (
        <ErrorHandler>{removeMemberStages.error.response.data}</ErrorHandler>
      )}
    </div>
  );
};

export default SingleMemberRemove;