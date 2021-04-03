import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import Checkbox from "components/UI/checkbox/checkbox";
import Button from "components/UI/formElements/button/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { RootState } from "reduxState/store";
import { fetchTask } from "reduxState/tasks/getSingleTask";
import { deleteTaskFetch } from "reduxState/tasks/deleteTask";
import { editTaskFetch } from "reduxState/tasks/editTask";
import { mutateToAxios } from "utils/onChangeForm";
import { editTaskMembersFetch } from "reduxState/tasks/editTaskMembers";

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

  // Params from URL
  const { teamId, projectId } = useParams<types.TParams>();

  // Local store for UI handle
  const [editMode, setEditMode] = useState(false);
  const [editMembers, setEditMembers] = useState(false);
  const [checkbox, setCheckbox] = useState([""]);

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

    /* Set date */
    let date: any;
    if (taskData.task.deadlineDate) {
      date = taskData.task.deadlineDate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
    }

    /* Set form with initial data from api */
    setForm((prevState: any) => {
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
  ]);

  //Use effect for array of all checkboxes
  useEffect(() => {
    setCheckbox(Array.from(taskData.task.members.map((el) => el.id)));
  }, [taskData.task.members]);

  // Handle submit edit task info
  const editTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = mutateToAxios(form);
    dispatch(editTaskFetch(teamId, projectId, props.id, data));
  };

  // Function to handle fetch on each checkbox when edit members
  const handleEditMembers = () => {
    const membersArray = Array.from(document.querySelectorAll(".memberEdit"));
    let data: any;
    membersArray.forEach((el: any) => {
      const currentMember = projectData.project.members.find(
        (e: any) => e.id === el.value
      );
      if (currentMember) {
        data = {
          member: {
            id: currentMember.id,
            role: currentMember.role,
            name: currentMember.name,
          },
          delete: !el.checked,
        };
        dispatch(editTaskMembersFetch(teamId, projectId, props.id, data));
      }
    });
  };

  // Function to handle onChange checkbox
  const changeCheckbox = (e: any) => {
    const checkboxes = [...checkbox];
    if (e.target.checked) {
      checkboxes.push(e.target.value);
    } else {
      const index = checkboxes.findIndex((ch) => ch === e.target.value);
      checkboxes.splice(index, 1);
    }
    setCheckbox(checkboxes);
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
                    <ErrorHandler>{editTask.error.response.data}</ErrorHandler>
                  )}
                </div>
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

      {/* Display members wrapper */}
      <div className={styles.memberContainerWrapper}>
        <div className={styles.membersWrapper}>
          <span className={styles.membersTitle}>Members</span>
          {taskData.task.members.length > 0 ? (
            <div className={styles.membersDataWrapper}>
              {taskData.task.members.map((el: any) => (
                <div className={styles.singleMember} key={el.id}>
                  <span className={styles.memberName}>{el.name}</span>
                  <span className={styles.memberRole}>{el.role}</span>
                </div>
              ))}
            </div>
          ) : (
            <span className={styles.noMembers}>
              There is no member of this task
            </span>
          )}

          {localStorage.getItem("id") === projectData.project.owner.id && (
            <div className={styles.enableAddMembersBtnWrapper}>
              <Button clicked={() => setEditMembers(!editMembers)}>
                Add members
              </Button>
            </div>
          )}
        </div>

        {/* Edit members wrapper */}
        {editMembers && (
          <div className={styles.membersEditWrapper}>
            <div className={styles.membersCheckboxesWrapper}>
              {projectData.project.members.map((el: any) => (
                <Checkbox
                  value={el.id}
                  id={el.id}
                  class={"memberEdit"}
                  checked={checkbox.find((e) => e === el.id) ? true : false}
                  change={(e: any) => changeCheckbox(e)}
                  name={el.name}
                />
              ))}
            </div>
            <div className={styles.addMembersBtnWrapper}>
              <Button clicked={handleEditMembers}>Submit</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTask;
