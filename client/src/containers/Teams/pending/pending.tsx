import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";

import styles from "../removeMembers/removeMembers.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { RootState } from "reduxState/store";
import { removePendingFetch } from "reduxState/teams/removePending";

const Pending = () => {
  const dispatch = useDispatch();
  const teamData = useSelector((state: RootState) => state.singleTeamData.team);
  const removeStages = useSelector(
    (state: RootState) => state.removePendingUser
  );

  const { teamId } = useParams<types.TParams>();

  const removeHandler = (userId: string) => {
    dispatch(removePendingFetch(teamId, { id: userId }));
  };

  return (
    <div className={styles.wrapper}>
      {removeStages.loading ? (
        <Spinner />
      ) : (
        <>
          {teamData.pendingUsers.map((member: any) => (
            <div className={styles.memberWrapper}>
              <span className={styles.memberName}>{member.userName}</span>
              <FontAwesomeIcon
                icon={faTrash}
                className={styles.iconRemove}
                onClick={() => removeHandler(member.userId)}
              />
            </div>
          ))}
          {removeStages.error && (
            <ErrorHandler>{removeStages.error.response.data}</ErrorHandler>
          )}
        </>
      )}
    </div>
  );
};

export default Pending;
