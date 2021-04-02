import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { RootState } from "reduxState/store";
import { fetchTask } from "reduxState/tasks/getSingleTask";
import { deleteTaskFetch } from "reduxState/tasks/deleteTask";

import styles from "./singleTask.module.scss";
interface Props {
  id: string;
}

/* Content of single task */
const SingleTask = (props: Props) => {
  const dispatch = useDispatch();

  const taskData = useSelector((state: RootState) => state.getTask);
  const projectData = useSelector(
    (state: RootState) => state.singleProjectData
  );
  const deleteTask = useSelector((state: RootState) => state.deleteTask);

  const { teamId, projectId } = useParams<types.TParams>();

  const [form, setForm] = useState({});

  useEffect(() => {
    dispatch(fetchTask(teamId, projectId, props.id));
  }, [dispatch, teamId, projectId, props.id]);

  return (
    <div className={styles.wrapper}>
      {deleteTask.loading ? (
        <Spinner />
      ) : (
        <div className={styles.taskInfoWrapper}>
          {projectData.project.owner.id === localStorage.getItem("id") && (
            <div className={styles.buttonsWrapper}>
              <FontAwesomeIcon
                icon={faEdit}
                className={styles.iconEdit}
                /* onClick={() => editHandler(props.id)} */
              />

              <FontAwesomeIcon
                icon={faTrash}
                className={styles.iconRemove}
                onClick={() =>
                  dispatch(deleteTaskFetch(teamId, projectId, props.id))
                }
              />
            </div>
          )}
          <span className={styles.taskName}>{taskData.task.name}</span>
          <span className={styles.taskStatus}>{taskData.task.status}</span>
          <span className={styles.taskContent}>{taskData.task.content}</span>

          <span className={styles.taskDate}>
            {taskData.task.startDate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
          </span>
          <span className={styles.taskDeadline}>
            {taskData.task.deadlineDate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
          </span>
          {deleteTask.error && (
            <ErrorHandler>{deleteTask.error.response.data}</ErrorHandler>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleTask;
