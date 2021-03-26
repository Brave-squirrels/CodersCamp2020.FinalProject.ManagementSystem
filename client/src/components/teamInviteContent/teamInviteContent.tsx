import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../UI/formElements/button/button";
import ButtonDanger from "../UI/formElements/buttonDanger/buttonDanger";
import SpinnerCard from "components/UI/SpinnerCard/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";

import { RootState } from "reduxState/store";
import { acceptInvite, declineInvite } from "reduxState/teamInvites";

import styles from "./teamInviteContent.module.scss";

interface Props {
  children: string;
  teamId: string;
}

const TeamInviteContent = (props: Props) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.handleTeamInvite);

  const acceptHandler = () => {
    dispatch(acceptInvite(props.teamId));
  };

  const declineHandler = () => {
    dispatch(declineInvite(props.teamId));
  };

  return (
    <>
      {state.success ? (
        <>{state.information}</>
      ) : (
        <>
          {state.error ? (
            <ErrorHandler>{state.error.response.data}</ErrorHandler>
          ) : state.loading ? (
            <SpinnerCard />
          ) : (
            <div className={styles.wrapper}>
              <>
                <span className={styles.inviteTitle}>{props.children}</span>
                <Button clicked={acceptHandler}>Accept</Button>
                <ButtonDanger clicked={declineHandler}>Decline</ButtonDanger>
              </>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TeamInviteContent;
