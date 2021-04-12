import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import Button from "components/UI/formElements/button/button";
import Spinner from "components/UI/Spinner/spinner";
import AlignVert from "hoc/alignVert/alignVert";
import ErrorHandler from "components/errorHandler/errorHandler";

import styles from "./leaveTeam.module.scss";

import { leaveTeamFetch } from "reduxState/teams/leaveTeam";
import { RootState } from "reduxState/store";

interface Props {
  close: () => void;
}

const LeaveTeam = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const leave = useSelector((state: RootState) => state.leaveTeam);

  const { teamId } = useParams<types.TParams>();

  const leaveTeamHandler = () => {
    dispatch(leaveTeamFetch(teamId));
  };
  if (leave.success) {
    history.push(`/`);
  }

  return (
    <>
      {leave.loading ? (
        <Spinner />
      ) : (
        <AlignVert>
          <div className={styles.wrapper}>
            <h2>Are you sure?</h2>
            <Button clicked={props.close}>Cancel</Button>
            <Button clicked={leaveTeamHandler} btnType="danger">
              Leave
            </Button>
          </div>
          {leave.error && (
            <ErrorHandler>{leave.error.response.data}</ErrorHandler>
          )}
        </AlignVert>
      )}
    </>
  );
};

export default LeaveTeam;
