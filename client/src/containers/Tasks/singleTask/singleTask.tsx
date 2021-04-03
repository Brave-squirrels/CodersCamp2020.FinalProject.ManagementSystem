import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import SingleTaskMembers from "containers/Tasks/singleTaskMembers/singleTaskMembers";
import OpacityAnimation from "hoc/opacityWrapper/opacityWrapper";
import TaskComments from "containers/Comments/taskComments";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { RootState } from "reduxState/store";
import { fetchTask } from "reduxState/tasks/getSingleTask";
import { deleteTaskFetch } from "reduxState/tasks/deleteTask";
import { editTaskFetch } from "reduxState/tasks/editTask";
import { fetchComments } from "reduxState/comments/getComments";
import { mutateToAxios } from "utils/onChangeForm";

import styles from "./singleTask.module.scss";
interface Props {
  id: string;
}

/* Content of single task */
const SingleTask = (props: Props) => {
  const dispatch = useDispatch();

  // Redux store to handle fetch data and stages
  const taskData = useSelector((state: RootState) => state.getTask);
  const projectData = useSelector(
    (state: RootState) => state.singleProjectData
  );
  const deleteTask = useSelector((state: RootState) => state.deleteTask);
  const editTask = useSelector((state: RootState) => state.editTask);
  const editMembersRedux = useSelector(
    (state: RootState) => state.editTaskMembers
  );
  const postComment = useSelector((state: RootState) => state.commentCreate);

  // Params from URL
  const { teamId, projectId } = useParams<types.TParams>();

  // Local store for UI handle
  const [editMode, setEditMode] = useState(false);

  // Form creator object
  const [form, setForm] = useState({
    name: {
      val: "",
      inputType: "input",
      label: "Title",
      type: "text",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 24,
      },
      touched: true,
      valid: true,
    },
    content: {
      val: "",
      inputType: "textarea",
      label: "Content",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 255,
      },
      touched: true,
      valid: true,
    },
    status: {
      val: "",
      inputType: "select",
      label: "Status",
      options: {
        new: {
          val: "NEW",
          name: "New",
        },
        inProgress: {
          val: "INPROGRESS",
          name: "In progress",
        },
        done: {
          val: "DONE",
          name: "Done",
        },
      },
      validation: {
        required: true,
      },
      touched: true,
      valid: true,
    },
    deadlineDate: {
      val: "",
      inputType: "input",
      type: "date",
      label: "Deadline",
      validation: {
        required: true,
        minDate: Date.now(),
      },
      touched: true,
      valid: true,
    },
    formValid: true,
  });

  // Main useEffect to fetch task data on change
  useEffect(() => {
    /* Fetch tasks */
    dispatch(fetchTask(teamId, projectId, props.id));

    /* Fetch comments */
    dispatch(fetchComments(teamId, projectId, props.id));
    /* Set date */
    let date: RegExpMatchArray | null;
    if (taskData.task.deadlineDate) {
      date = taskData.task.deadlineDate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
    }

    /* Set form with initial data from api */
    setForm((prevState) => {
      return {
        ...prevState,
        name: {
          ...prevState.name,
          val: taskData.task.name,
        },
        content: {
          ...prevState.content,
          val: taskData.task.content,
        },
        status: {
          ...prevState.status,
          val: taskData.task.status,
        },
        deadlineDate: {
          ...prevState.deadlineDate,
          val: date ? date[0] : "",
        },
      };
    });
  }, [
    dispatch,
    teamId,
    projectId,
    props.id,
    taskData.task.name,
    taskData.task.deadlineDate,
    taskData.task.status,
    taskData.task.content,
    editMembersRedux.success,
    postComment.success,
  ]);

  // Handle submit edit task info
  const editTaskHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = mutateToAxios(form);
    dispatch(editTaskFetch(teamId, projectId, props.id, data));
  };

  return (
    <div className={styles.wrapper}>
      {deleteTask.loading ? (
        <Spinner />
      ) : (
        <div className={styles.taskInfoWrapper}>
          {/* Edit and remove buttons */}
          {projectData.project.owner.id === localStorage.getItem("id") && (
            <div className={styles.buttonsWrapper}>
              <FontAwesomeIcon
                icon={faEdit}
                className={styles.iconEdit}
                onClick={() => setEditMode(!editMode)}
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

          {/* Task info + edit */}
          {editMode ? (
            <>
              {editTask.loading ? (
                <Spinner />
              ) : (
                <OpacityAnimation>
                  <div className={styles.editTaskWrapper}>
                    <FormStructure
                      state={form}
                      setState={setForm}
                      btnText="Edit"
                      formTitle="Edit task"
                      submitted={editTaskHandler}
                      checkPass={false}
                    />
                    {editTask.error && (
                      <ErrorHandler>
                        {editTask.error.response.data}
                      </ErrorHandler>
                    )}
                  </div>
                </OpacityAnimation>
              )}
            </>
          ) : taskData.loading ? (
            <Spinner />
          ) : (
            <div className={styles.innerTaskWrapper}>
              <span className={styles.taskName}>{taskData.task.name}</span>
              <span className={styles.taskStatus}>
                {taskData.task.status === "NEW"
                  ? "New"
                  : taskData.task.status === "INPROGRESS"
                  ? "In progress"
                  : taskData.task.status === "DONE"
                  ? "Done"
                  : ""}
              </span>
              <span className={styles.taskContent}>
                {taskData.task.content}
              </span>

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
      )}

      {/* Task members component */}
      <SingleTaskMembers id={props.id} />
      {/* Task comments */}
      <TaskComments id={props.id} />
    </div>
  );
};

export default SingleTask;
