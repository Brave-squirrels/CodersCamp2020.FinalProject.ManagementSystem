import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import ProjectSidebar from "containers/Projects/Project/projectSidebar/projectSidebar";
import RightSideWrapper from "hoc/rightSideWrapper/rightSideWrapper";
import { CardWithTitle } from "components/UI/CardWithTitle/CardWithTitle";
import TaskCard from "components/UI/taskCard/taskCard";
import AddNew from "components/UI/addNew/addNew";
import Modal from "components/Modal/modal";
import CreateTask from "./createTasks/createTask";

import { RootState } from "reduxState/store";
import { fetchTasks } from "reduxState/tasks/getTasks";

import styles from "./tasks.module.scss";

const Tasks = () => {
  const [createModal, setCreateModal] = useState(false);
  const createStages = useSelector((state: RootState) => state.createTask);
  const tasks = useSelector((state: RootState) => state.getTasks);

  const dispatch = useDispatch();
  const { teamId, projectId } = useParams<types.TParams>();
  useEffect(() => {
    setCreateModal(false);
    dispatch(fetchTasks(teamId, projectId));
  }, [createStages.success, teamId, projectId, dispatch]);

  return (
    <>
      <Modal show={createModal} onClose={() => setCreateModal(false)}>
        <CreateTask />
      </Modal>
      <ViewWithSidebar>
        <ProjectSidebar />
        <RightSideWrapper title={"Tasks"}>
          <div className={styles.container}>
            <div className={styles.addBtnWrapper}>
              <AddNew clicked={() => setCreateModal(true)} />
            </div>
            <CardWithTitle title="New">
              <div className={styles.taskCon}>
                {tasks.tasks
                  .filter((tsk: any) => tsk.status === "NEW")
                  .map((el: any) => (
                    <TaskCard key={el._id}>{el.name}</TaskCard>
                  ))}
              </div>
            </CardWithTitle>
            <CardWithTitle title="In progress">
              <div className={styles.taskCon}>
                {tasks.tasks
                  .filter((tsk: any) => tsk.status === "INPROGRESS")
                  .map((el: any) => (
                    <TaskCard key={el._id}>{el.name}</TaskCard>
                  ))}
              </div>
            </CardWithTitle>
            <CardWithTitle title="Done">
              <div className={styles.taskCon}>
                {tasks.tasks
                  .filter((tsk: any) => tsk.status === "DONE")
                  .map((el: any) => (
                    <TaskCard key={el._id}>{el.name}</TaskCard>
                  ))}
              </div>
            </CardWithTitle>
          </div>
        </RightSideWrapper>
      </ViewWithSidebar>
    </>
  );
};

export default Tasks;
