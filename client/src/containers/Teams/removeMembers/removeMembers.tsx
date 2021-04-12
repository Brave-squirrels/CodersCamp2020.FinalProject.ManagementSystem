import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";

import styles from "./removeMembers.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { RootState } from "reduxState/store";
import { removeMemberFetch } from "reduxState/teams/removeMember";

const RemoveMembers = () => {
  const dispatch = useDispatch();
  const teamData = useSelector((state: RootState) => state.singleTeamData.team);
  const removeStages = useSelector(
    (state: RootState) => state.removeTeamMember
  );

  const { teamId } = useParams<types.TParams>();

  const removeHandler = (userId: string) => {
    dispatch(removeMemberFetch(teamId, { id: userId }));
  };

  return (
    <div className={styles.wrapper}>
      {removeStages.loading ? (
        <Spinner />
      ) : (
        <>
        <h2>Members</h2>
        
          {(teamData.members.length > 1) ? teamData.members
            .filter(
              (member: types.Member) => member.userId !== teamData.ownerId
            )
            .map((member: types.Member) => (
              <div className={styles.memberWrapper}>
                <span className={styles.memberName}>{member.userName}</span>
                <FontAwesomeIcon
                  icon={faTrash}
                  className={styles.iconRemove}
                  onClick={() => removeHandler(member.userId)}
                />
              </div>
            )) : <p className={styles.noUsers}>No members in team</p>
          }
          {removeStages.error && (
            <ErrorHandler>{removeStages.error.response.data}</ErrorHandler>
          )}
        </>
      )}
    </div>
  );
};

export default RemoveMembers;
