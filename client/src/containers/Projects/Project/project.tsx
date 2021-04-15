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
import ChangeButton from "components/UI/changeButton/changeButton";

import styles from "./project.module.scss";

import { RootState } from "reduxState/store";

const Project = () => {
  const editStages = useSelector((state: RootState) => state.updateProjectInfo);
  const changeStatusStages = useSelector(
    (state: RootState) => state.updateProjectStatus
  );
  const deleteProjectStages = useSelector(
    (state: RootState) => state.deleteProject
  );

  const teamData = useSelector((state: RootState) => state.singleTeamData);
  const projectData = useSelector(
    (state: RootState) => state.singleProjectData
  );

  const [descModal, setDescModal] = useState(false);
  const [memberModal, setMemberModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [deleteProject, setDeleteProject] = useState(false);

  useEffect(() => {
    setDescModal(false);
    setMemberModal(false);
    setStatusModal(false);
    setDeleteProject(false);
  }, [
    editStages.success,
    changeStatusStages.success,
    deleteProjectStages.success,
  ]);

  const allowed =
    projectData.project.owner.id === localStorage.getItem("id") ? true : false;

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
      <Modal
        show={deleteProject}
        onClose={() => setDeleteProject(false)}
        height={"250px"}
        width={"600px"}
      >
        <DeleteProject close={() => setDeleteProject(false)} />
      </Modal>
      <ProjectSidebar />
      {projectData.loading ? (
        <Spinner />
      ) : projectData.error ? (
        <ErrorHandler>Something went wrong...</ErrorHandler>
      ) : (
        <RightSideWrapper title={projectData.project.projectName}>
          {/* Container for project's info */}
          <>
            {(localStorage.getItem("id") === projectData.project.owner.id ||
              localStorage.getItem("id") === teamData.team.ownerId) && (
              <div className={styles.buttonsWrapper}>
                <ChangeButton
                  title={"Delete project"}
                  clicked={() => setDeleteProject(true)}
                />
              </div>
            )}
          </>

          <div className={styles.container}>
            <div>
              <CardWithTitle title={"Description"}>
                {allowed && (
                  <ChangeButton
                    title="Change project info"
                    clicked={() => setDescModal(true)}
                  />
                )}
                {projectData.project.content}
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
              {projectData.project.members.map(
                (member: types.ProjectMember) => (
                  <div className={styles.memberWrapper} key={member.id}>
                    <span className={styles.memberName}>{member.name}</span>
                    <span className={styles.memberRole}>{member.role}</span>
                  </div>
                )
              )}
            </CardWithTitle>

            <div>
              <CardWithTitle title={"Status"}>
                {allowed && (
                  <ChangeButton
                    title="Change project status"
                    clicked={() => setStatusModal(true)}
                  />
                )}
                {projectData.project.status}
              </CardWithTitle>
              <CardWithTitle title={"Start date"}>
                {projectData.project.date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
              </CardWithTitle>
              <CardWithTitle title={"Deadline"}>
                {projectData.project.deadline.match(
                  /[0-9]{4}-[0-9]{2}-[0-9]{2}/
                )}
              </CardWithTitle>
              <CardWithTitle title={"Project owner"}>
                {projectData.project.owner.name}
              </CardWithTitle>
            </div>
          </div>
        </RightSideWrapper>
      )}
    </ViewWithSidebar>
  );
};

export default Project;
