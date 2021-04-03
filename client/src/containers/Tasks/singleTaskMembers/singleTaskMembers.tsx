import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import Checkbox from "components/UI/checkbox/checkbox";
import Button from "components/UI/formElements/button/button";
import ErrorHandler from "components/errorHandler/errorHandler";

import { editTaskMembersFetch } from "reduxState/tasks/editTaskMembers";
import { RootState } from "reduxState/store";

import styles from "./singleTaskMembers.module.scss";

interface Props {
  id: string;
}

interface Data {
  member: {
    id: string;
    name: string;
    role: string;
  };
  delete: boolean;
}

const SingleTaskMembers = (props: Props) => {
  const dispatch = useDispatch();

  // Main redux data
  const taskData = useSelector((state: RootState) => state.getTask);
  const projectData = useSelector(
    (state: RootState) => state.singleProjectData
  );
  const editMembersRedux = useSelector(
    (state: RootState) => state.editTaskMembers
  );
  //Main local data for UI
  const [editMembers, setEditMembers] = useState(false);
  const [checkbox, setCheckbox] = useState([""]);

  //  Params from URL
  const { teamId, projectId } = useParams<types.TParams>();

  //Use effect for array of all checkboxes
  useEffect(() => {
    setCheckbox(
      Array.from(
        taskData.task.members.map((member: types.ProjectMember) => member.id)
      )
    );
  }, [taskData.task.members]);

  // Function to handle fetch on each checkbox when edit members
  const handleEditMembers = () => {
    const membersArray = Array.from(document.querySelectorAll(".memberEdit"));
    let data: Data;
    membersArray.forEach((checkboxNode: any) => {
      const currentMember = projectData.project.members.find(
        (inputCheckbox: types.ProjectMember) =>
          inputCheckbox.id === checkboxNode.value
      );
      if (currentMember) {
        data = {
          member: {
            id: currentMember.id,
            role: currentMember.role,
            name: currentMember.name,
          },
          delete: !checkboxNode.checked,
        };
        dispatch(editTaskMembersFetch(teamId, projectId, props.id, data));
      }
    });
  };

  // Function to handle onChange checkbox
  const changeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxes = [...checkbox];
    if (event.target.checked) {
      checkboxes.push(event.target.value);
    } else {
      const index = checkboxes.findIndex(
        (checkbox) => checkbox === event.target.value
      );
      checkboxes.splice(index, 1);
    }
    setCheckbox(checkboxes);
  };

  return (
    <div className={styles.memberContainerWrapper}>
      <div className={styles.membersWrapper}>
        <span className={styles.membersTitle}>Members</span>
        {taskData.task.members.length > 0 ? (
          <div className={styles.membersDataWrapper}>
            {taskData.task.members.map((member: types.ProjectMember) => (
              <div className={styles.singleMember} key={member.id}>
                <span className={styles.memberName}>{member.name}</span>
                <span className={styles.memberRole}>{member.role}</span>
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
            {projectData.project.members.map(
              (projectMember: types.ProjectMember) => (
                <Checkbox
                  value={projectMember.id}
                  id={projectMember.id}
                  class={"memberEdit"}
                  checked={
                    checkbox.find(
                      (checkboxId: string) => checkboxId === projectMember.id
                    )
                      ? true
                      : false
                  }
                  change={(e: React.ChangeEvent<HTMLInputElement>) =>
                    changeCheckbox(e)
                  }
                  name={projectMember.name}
                />
              )
            )}
          </div>
          <div className={styles.addMembersBtnWrapper}>
            <Button clicked={handleEditMembers}>Submit</Button>
            {editMembersRedux.error && (
              <ErrorHandler>
                {editMembersRedux.error.response.data}
              </ErrorHandler>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTaskMembers;
