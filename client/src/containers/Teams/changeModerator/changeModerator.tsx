import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import styles from "./changeModerator.module.scss";
import Spinner from "components/UI/Spinner/spinner";

import { RootState } from "reduxState/store";
import {
  changeModeratorFetch,
  removeModeratorFetch,
} from "reduxState/teams/changeModerators";

const ChangeModerator = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.singleTeamData);
  const changeModeratorState = useSelector(
    (state: RootState) => state.changeTeamModerator
  );

  const { teamId } = useParams<types.TParams>();

  const addPermission = (user: types.Member) => {
    dispatch(changeModeratorFetch(teamId, { id: user.userId }));
  };

  const removePermission = (user: types.Member) => {
    dispatch(removeModeratorFetch(teamId, { id: user.userId }));
  };

  return (
    <>
      {changeModeratorState.loading ? (
        <Spinner />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.moderators}>
            <h2>Moderators</h2>
            {state.team.members
              .filter(
                (member: types.Member) =>
                  state.team.moderatorsId.includes(member.userId) &&
                  member.userId !== state.team.ownerId
              )
              .map((moderator: types.Member) => (
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
            {state.team.members
              .filter(
                (member: types.Member) =>
                  !state.team.moderatorsId.includes(member.userId) &&
                  member.userId !== state.team.ownerId
              )
              .map((member: types.Member) => (
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
      )}
    </>
  );
};
export default ChangeModerator;
