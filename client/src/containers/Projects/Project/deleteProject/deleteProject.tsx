import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import Button from "components/UI/formElements/button/button";
import AlignVert from "hoc/alignVert/alignVert";

import { RootState } from "reduxState/store";
import { deleteProjectFetch } from "reduxState/projects/deleteProject";

import styles from "./deleteProject.module.scss";

interface Props {
  close: () => void;
}

const DeleteProject = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { teamId, projectId } = useParams<types.TParams>();
  const deleteStages = useSelector((state: RootState) => state.deleteProject);
  const handleDeleteProject = () => {
    dispatch(deleteProjectFetch(teamId, projectId));
    if (deleteStages.success) {
      history.push(`/teams/${teamId}`);
    }
  };

  return (
    <AlignVert>
      {deleteStages.loading ? (
        <Spinner />
      ) : (
        <div className={styles.innerWrapper}>
          <h2 className={styles.title}>Are you sure?</h2>
          <Button clicked={handleDeleteProject} btnType="danger">
            Delete
          </Button>
          <Button clicked={props.close}>Cancel</Button>
          {deleteStages.error && (
            <ErrorHandler>{deleteStages.error.response.data}</ErrorHandler>
          )}
        </div>
      )}
    </AlignVert>
  );
};

export default DeleteProject;
