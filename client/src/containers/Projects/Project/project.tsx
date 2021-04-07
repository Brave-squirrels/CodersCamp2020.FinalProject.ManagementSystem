import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as types from "utils/types";

import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import { CardWithTitle } from "components/UI/CardWithTitle/CardWithTitle";
import RightSideWrapper from "hoc/rightSideWrapper/rightSideWrapper";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import ProjectSidebar from "./projectSidebar/projectSidebar";
import AddNew from "components/UI/addNew/addNew";
import Modal from "components/Modal/modal";
import ChangeInfo from "./changeDescription/changeInfo";
import ChangeMembers from "./changeMembers/changeMembers";
import ChangeStatus from "./changeStatus/changeStatus";
import DeleteProject from "./deleteProject/deleteProject";

import styles from "./project.module.scss";

import { RootState } from "reduxState/store";

const Project = () => {
  const state = useSelector((state: RootState) => state.singleProjectData);
  const editStages = useSelector((state: RootState) => state.updateProjectInfo);
  const changeStatusStages = useSelector(
    (state: RootState) => state.updateProjectStatus
  );

  const [descModal, setDescModal] = useState(false);
  const [memberModal, setMemberModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [deleteProject, setDeleteProject] = useState(false);

  useEffect(() => {
    setDescModal(false);
    setMemberModal(false);
    setStatusModal(false);
  }, [editStages.success, changeStatusStages.success]);

  const allowed =
    state.project.owner.id === localStorage.getItem("id") ? true : false;

  return (
    <ViewWithSidebar>
      <Modal show={descModal} onClose={() => setDescModal(false)}>
        <ChangeInfo />
      </Modal>
      <Modal show={memberModal} onClose={() => setMemberModal(false)}>
        <ChangeMembers />
      </Modal>
      <Modal show={statusModal} onClose={() => setStatusModal(false)}>
        <ChangeStatus />
      </Modal>
      <Modal show={deleteProject} onClose={() => setDeleteProject(false)}>
        <DeleteProject />
      </Modal>
      <ProjectSidebar />
      {state.loading ? (
        <Spinner />
      ) : state.error ? (
        <ErrorHandler>Something went wrong...</ErrorHandler>
      ) : (
        <RightSideWrapper title={state.project.projectName}>
          {/* Container for project's info */}
          <div className={styles.container}>
            <div>
              <CardWithTitle
                title={
                  allowed ? (
                    <>
                      {" "}
                      Description <AddNew clicked={() => setDescModal(true)} />
                    </>
                  ) : (
                    "Description"
                  )
                }
                additionalClass={allowed ? "taskTitle" : ""}
              >
                {state.project.content}
              </CardWithTitle>
            </div>

            <CardWithTitle
              title={
                allowed ? (
                  <>
                    {" "}
                    Members <AddNew clicked={() => setMemberModal(true)} />
                  </>
                ) : (
                  "Members"
                )
              }
              additionalClass={allowed ? "taskTitle" : ""}
            >
              {state.project.members.map((member: types.ProjectMember) => (
                <div className={styles.memberWrapper}>
                  <span className={styles.memberName}>{member.name}</span>
                  <span className={styles.memberRole}>{member.role}</span>
                </div>
              ))}
            </CardWithTitle>

            <div>
              <CardWithTitle
                title={
                  allowed ? (
                    <>
                      {" "}
                      Status <AddNew clicked={() => setStatusModal(true)} />
                    </>
                  ) : (
                    "Status"
                  )
                }
                additionalClass={allowed ? "taskTitle" : ""}
              >
                {state.project.status}
              </CardWithTitle>
              <CardWithTitle title={"Start date"}>
                {state.project.date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
              </CardWithTitle>
              <CardWithTitle title={"Deadline"}>
                {state.project.deadline.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
              </CardWithTitle>
              <CardWithTitle title={"Project owner"}>
                {state.project.owner.name}
              </CardWithTitle>
            </div>
          </div>
        </RightSideWrapper>
      )}
    </ViewWithSidebar>
  );
};

export default Project;
