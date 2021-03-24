import SideBar from "components/UI/sideBar/sideBar";
import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import styles from "./project.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "reduxState/store";
import { fetchProject } from "reduxState/projectDataSlice";

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
      <div className={styles.rightSideWrapper}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{state.project.projectName}</h1>

          {/* Container for project's info */}
          <div className={styles.container}></div>
        </div>
      </div>
    </ViewWithSidebar>
  );
};

export default Project;
