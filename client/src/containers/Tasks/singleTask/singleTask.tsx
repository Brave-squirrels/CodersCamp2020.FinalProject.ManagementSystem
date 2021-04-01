import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import { RootState } from "reduxState/store";
import { fetchTask } from "reduxState/tasks/getSingleTask";
interface Props {
  id: string;
}

/* Content of single task */
const SingleTask = (props: Props) => {
  const dispatch = useDispatch();

  const taskData = useSelector((state: RootState) => state.getTask);

  const { teamId, projectId } = useParams<types.TParams>();

  useEffect(() => {
    dispatch(fetchTask(teamId, projectId, props.id));
  }, [dispatch, teamId, projectId, props.id]);

  return (
    <div>
      <p>{taskData.task.name}</p>
      <p>{taskData.task.content}</p>
      <p>{taskData.task.status}</p>
    </div>
  );
};

export default SingleTask;
