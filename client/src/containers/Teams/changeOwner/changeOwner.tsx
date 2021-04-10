import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import Button from "components/UI/formElements/button/button";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";

import { RootState } from "reduxState/store";
import { changeOwnerFetch } from "reduxState/teams/changeOwner";

import styles from "./changeOwner.module.scss";

const ChangeOwner = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.singleTeamData);
  const ownerId = state.team.ownerId;
  const teamMembers = state.team.members.filter(
    (member: types.Member) => member.userId !== ownerId
  );
  const changeOwnerState = useSelector(
    (state: RootState) => state.changeTeamOwner
  );

  const { teamId } = useParams<types.TParams>();

  const changeOwner = (userId: string) => {
    dispatch(changeOwnerFetch(teamId, { id: userId }));
  };

  const [opened, setOpened] = useState(false);
  const [memberId, setMemberId] = useState("");

  let classList;
  if (opened) classList = styles.confirm;
  else classList = styles.display;

  return (
    <>
      <div className={classList}>
        <div className={styles.confirmWrapper}>
          {changeOwnerState.loading ? (
            <Spinner />
          ) : (
            <>
              <h2>Are you sure?</h2>
              <div className={styles.confirmModal}>
                <Button clicked={() => setOpened(false)}>Cancel</Button>
                <Button clicked={() => changeOwner(memberId)} btnType="danger">
                  Change
                </Button>
              </div>
              {changeOwnerState.error && (
                <ErrorHandler>
                  {changeOwnerState.error.response.data}
                </ErrorHandler>
              )}
            </>
          )}
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.members}>
          <h2>Members</h2>
          {teamMembers.map((member: types.Member) => (
            <div key={member.userId}>
              <div>{member.userName}</div>
              <div
                onClick={() => {
                  setOpened(true);
                  setMemberId(member.userId);
                }}
                className={styles.promote}
              >
                Promote
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ChangeOwner;
