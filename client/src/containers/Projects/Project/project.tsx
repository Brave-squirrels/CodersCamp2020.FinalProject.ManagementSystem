import SideBar from "components/UI/sideBar/sideBar";
import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import styles from "./project.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "reduxState/store";
import { fetchProject } from "reduxState/projectDataSlice";
import { CardWithTitle } from "components/UI/CardWithTitle/CardWithTitle";
import RightSideWrapper from "hoc/rightSideWrapper/rightSideWrapper";

import * as types from "../../../utils/types";

const Project = () => {
  const dispatch = useDispatch();

  const { teamId, projectId } = useParams<types.TParams>();

  const state = useSelector((state: RootState) => state.singleProjectData);

  useEffect(() => {
    dispatch(fetchProject(teamId, projectId));
  }, [dispatch, projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ViewWithSidebar>
      <SideBar sidebarTitle="Your teams" />
      <RightSideWrapper title={state.project.projectName}>
        {/* Container for project's info */}
        <div className={styles.container}>
          <div>
            <CardWithTitle title={"Description"}>
              {state.project.content}
            </CardWithTitle>
            <CardWithTitle title={"Start date"}>
              {state.project.date}
            </CardWithTitle>
            <CardWithTitle title={"Deadline"}>
              {state.project.deadline.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
            </CardWithTitle>
            <CardWithTitle title={"Team owner"}>
              {state.project.owner.name}
            </CardWithTitle>
          </div>

          <CardWithTitle title={"Members"}>
            {state.project.members.map((member: any) => member.name)}
          </CardWithTitle>

          <div>
            <CardWithTitle title={"Project Menager"}>
              {state.project.description}
            </CardWithTitle>
            <CardWithTitle title={"Scrum Master"}>
              {state.project.description}
            </CardWithTitle>
            <CardWithTitle title={"Development Menager"}>
              {state.project.description}
            </CardWithTitle>
          </div>
        </div>
      </RightSideWrapper>
    </ViewWithSidebar>
  );
};

export default Project;
