import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";
import { useHistory } from "react-router-dom";

import Button from "components/UI/formElements/button/button";
import ErrorHandler from "components/errorHandler/errorHandler";
import Spinner from "components/UI/Spinner/spinner";
import AlignVert from "hoc/alignVert/alignVert";

import styles from "./deleteTeam.module.scss";

import { RootState } from "reduxState/store";
import { deleteTeamFetch, reset } from "reduxState/teams/deleteTeam";

interface Props {
  close: () => void;
}

const DeleteTeam = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const deleteTeam = useSelector((state: RootState) => state.deleteTeam);

  const { teamId } = useParams<types.TParams>();

  const deleteTeamHandler = () => {
    dispatch(deleteTeamFetch(teamId));
  };

  useEffect(() => {
    return () => {
      if (deleteTeam.success) {
        history.push("/");
        dispatch(reset());
      }
    };
  }, [deleteTeam.success, dispatch, history]);

  return (
    <>
      {deleteTeam.loading ? (
        <Spinner />
      ) : (
        <AlignVert>
          <div className={styles.wrapper}>
            <h2>Are you sure that you want delete this team?</h2>
            <Button clicked={props.close}>Cancel</Button>
            <Button clicked={deleteTeamHandler} btnType="danger">
              Yes
            </Button>
          </div>
          {deleteTeam.error && (
            <ErrorHandler>{deleteTeam.error.response.data}</ErrorHandler>
          )}
        </AlignVert>
      )}
    </>
  );
};

export default DeleteTeam;
