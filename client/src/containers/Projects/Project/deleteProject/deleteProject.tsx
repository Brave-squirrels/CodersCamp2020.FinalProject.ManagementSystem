import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";

import { RootState } from "reduxState/store";
import { deleteProjectFetch } from "reduxState/projects/deleteProject";

interface Props {
  close: () => void;
}

const DeleteProject = (props: Props) => {
  const dispatch = useDispatch();
  const { teamId, projectId } = useParams<types.TParams>();
  const handleDeleteProject = () => {
    dispatch(deleteProjectFetch(teamId, projectId));
  };

  return (
    <div>
      <button onClick={handleDeleteProject}>Delete</button>
      <button onClick={props.close}>Cancel</button>
    </div>
  );
};

export default DeleteProject;
