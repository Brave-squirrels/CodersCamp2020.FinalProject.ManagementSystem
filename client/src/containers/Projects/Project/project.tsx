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

import styles from "./project.module.scss";

import { RootState } from "reduxState/store";

const Project = () => {
  const state = useSelector((state: RootState) => state.singleProjectData);
  const editStages = useSelector((state: RootState) => state.updateProjectInfo);

  const [descModal, setDescModal] = useState(false);

  const updateInfo = () => {};

  useEffect(() => {
    setDescModal(false);
  }, [editStages.success]);

  const allowed =
    state.project.owner.id === localStorage.getItem("id") ? true : false;

  return (
    <ViewWithSidebar>
      <Modal show={descModal} onClose={() => setDescModal(false)}>
        <ChangeInfo />
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
              <CardWithTitle title={"Start date"}>
                {state.project.date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
              </CardWithTitle>
              <CardWithTitle title={"Deadline"}>
                {state.project.deadline.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
              </CardWithTitle>
              <CardWithTitle
                title={
                  allowed ? (
                    <>
                      {" "}
                      Team owner <AddNew clicked={updateInfo} />
                    </>
                  ) : (
                    "Team owner"
                  )
                }
                additionalClass={allowed ? "taskTitle" : ""}
              >
                {state.project.owner.name}
              </CardWithTitle>
            </div>

            <CardWithTitle
              title={
                allowed ? (
                  <>
                    {" "}
                    Members <AddNew clicked={updateInfo} />
                  </>
                ) : (
                  "Members"
                )
              }
              additionalClass={allowed ? "taskTitle" : ""}
            >
              {state.project.members.map(
                (member: types.ProjectMember) => member.name
              )}
            </CardWithTitle>

            <div>
              <CardWithTitle
                title={
                  allowed ? (
                    <>
                      {" "}
                      Frontend <AddNew clicked={updateInfo} />
                    </>
                  ) : (
                    "Frontend"
                  )
                }
                additionalClass={allowed ? "taskTitle" : ""}
              >
                blank
              </CardWithTitle>
              <CardWithTitle
                title={
                  allowed ? (
                    <>
                      {" "}
                      Backend <AddNew clicked={updateInfo} />
                    </>
                  ) : (
                    "Backend"
                  )
                }
                additionalClass={allowed ? "taskTitle" : ""}
              >
                blank
              </CardWithTitle>
              <CardWithTitle
                title={
                  allowed ? (
                    <>
                      {" "}
                      DevOps <AddNew clicked={updateInfo} />
                    </>
                  ) : (
                    "DevOps"
                  )
                }
                additionalClass={allowed ? "taskTitle" : ""}
              >
                blank
              </CardWithTitle>
            </div>
          </div>
        </RightSideWrapper>
      )}
    </ViewWithSidebar>
  );
};

export default Project;
