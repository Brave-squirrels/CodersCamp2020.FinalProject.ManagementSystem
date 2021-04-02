import { useSelector } from "react-redux";
import * as types from "utils/types";

import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import { CardWithTitle } from "components/UI/CardWithTitle/CardWithTitle";
import RightSideWrapper from "hoc/rightSideWrapper/rightSideWrapper";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import ProjectSidebar from "./projectSidebar/projectSidebar";

import styles from "./project.module.scss";

import { RootState } from "reduxState/store";

const Project = () => {
  const state = useSelector((state: RootState) => state.singleProjectData);

  return (
    <ViewWithSidebar>
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
              <CardWithTitle title={"Description"}>
                {state.project.content}
              </CardWithTitle>
              <CardWithTitle title={"Start date"}>
                {state.project.date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
              </CardWithTitle>
              <CardWithTitle title={"Deadline"}>
                {state.project.deadline.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
              </CardWithTitle>
              <CardWithTitle title={"Team owner"}>
                {state.project.owner.name}
              </CardWithTitle>
            </div>

            <CardWithTitle title={"Members"}>
              {state.project.members.map(
                (member: types.ProjectMember) => member.name
              )}
            </CardWithTitle>

            <div>
              <CardWithTitle title={"Project Menager"}>blank</CardWithTitle>
              <CardWithTitle title={"Scrum Master"}>blank</CardWithTitle>
              <CardWithTitle title={"Development Menager"}>blank</CardWithTitle>
            </div>
          </div>
        </RightSideWrapper>
      )}
    </ViewWithSidebar>
  );
};

export default Project;
