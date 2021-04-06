import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";
import Carousel from "react-elastic-carousel";

import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import ProjectSidebar from "containers/Projects/Project/projectSidebar/projectSidebar";
import RightSideWrapper from "hoc/rightSideWrapper/rightSideWrapper";
import { CardWithTitle } from "components/UI/CardWithTitle/CardWithTitle";
import TaskCard from "components/UI/taskCard/taskCard";
import AddNew from "components/UI/addNew/addNew";
import Modal from "components/Modal/modal";
import CreateTask from "./createTasks/createTask";
import Spinner from "components/UI/Spinner/spinner";
import SingleTask from "./singleTask/singleTask";

import { RootState } from "reduxState/store";
import { fetchTasks } from "reduxState/tasks/getTasks";

import styles from "./tasks.module.scss";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 500, itemsToShow: 2, itemsToScroll: 2 },
  { width: 700, itemsToShow: 3 },
];

const Tasks = () => {
  const dispatch = useDispatch();

  // Local UI states
  const [createModal, setCreateModal] = useState(false);
  const [singleTaskModal, setSingleTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState("");

  // Params from URL
  const { teamId, projectId } = useParams<types.TParams>();

  // Tasks from project
  const tasks = useSelector((state: RootState) => state.getTasks);
  // Project data
  const project = useSelector((state: RootState) => state.singleProjectData);
  // Create task data
  const createStages = useSelector((state: RootState) => state.createTask);
  // Delete task data
  const deleteStages = useSelector((state: RootState) => state.deleteTask);
  // Edit task data
  const editStages = useSelector((state: RootState) => state.editTask);

  useEffect(() => {
    setCreateModal(false);
    setSingleTaskModal(false);
    dispatch(fetchTasks(teamId, projectId));
  }, [
    createStages.success,
    teamId,
    projectId,
    dispatch,
    deleteStages.success,
    editStages.success,
  ]);

  // Render add new task base on permission
  let titleContent =
    project.project.owner.id === localStorage.getItem("id") ? (
      <>
        New
        <AddNew clicked={() => setCreateModal(true)} />
      </>
    ) : (
      "New"
    );

  return (
    <>
      <Modal show={singleTaskModal} onClose={() => setSingleTaskModal(false)}>
        <SingleTask id={currentTask} />
      </Modal>
      <Modal show={createModal} onClose={() => setCreateModal(false)}>
        <CreateTask />
      </Modal>
      <ViewWithSidebar>
        <ProjectSidebar />
        <RightSideWrapper title={"Tasks"}>
          <div className={styles.container}>
            {tasks.loading ? (
              <Spinner />
            ) : (
              <>
                <Carousel
                  breakPoints={breakPoints}
                  isRTL={false}
                  pagination={false}
                  showArrows={false}
                  className={styles.carousel}
                  outerSpacing={0}
                  itemPadding={[10, 10]}
                >
                  <CardWithTitle
                    title={titleContent}
                    additionalClass={"taskTitle"}
                  >
                    <div className={styles.taskCon}>
                      {tasks.tasks
                        .filter((tsk: types.TaskData) => tsk.status === "NEW")
                        .map((task: types.TaskData) => (
                          <TaskCard
                            clicked={() => {
                              setSingleTaskModal(true);
                              setCurrentTask(task._id);
                            }}
                            key={task._id}
                            highLight={
                              task.members.find(
                                (member: types.ProjectMember) =>
                                  member.id === localStorage.getItem("id")
                              )
                                ? true
                                : false
                            }
                          >
                            {task.name}
                          </TaskCard>
                        ))}
                    </div>
                  </CardWithTitle>
                  <CardWithTitle
                    title="In progress"
                    additionalClass={"taskTitle"}
                  >
                    <div className={styles.taskCon}>
                      {tasks.tasks
                        .filter(
                          (tsk: types.TaskData) => tsk.status === "INPROGRESS"
                        )
                        .map((task: types.TaskData) => (
                          <TaskCard
                            clicked={() => {
                              setSingleTaskModal(true);
                              setCurrentTask(task._id);
                            }}
                            key={task._id}
                            highLight={
                              task.members.find(
                                (member: types.ProjectMember) =>
                                  member.id === localStorage.getItem("id")
                              )
                                ? true
                                : false
                            }
                          >
                            {task.name}
                          </TaskCard>
                        ))}
                    </div>
                  </CardWithTitle>
                  <CardWithTitle title="Done" additionalClass={"taskTitle"}>
                    <div className={styles.taskCon}>
                      {tasks.tasks
                        .filter((tsk: types.TaskData) => tsk.status === "DONE")
                        .map((task: types.TaskData) => (
                          <TaskCard
                            clicked={() => {
                              setSingleTaskModal(true);
                              setCurrentTask(task._id);
                            }}
                            key={task._id}
                            highLight={
                              task.members.find(
                                (member: types.ProjectMember) =>
                                  member.id === localStorage.getItem("id")
                              )
                                ? true
                                : false
                            }
                          >
                            {task.name}
                          </TaskCard>
                        ))}
                    </div>
                  </CardWithTitle>
                </Carousel>
              </>
            )}
          </div>
        </RightSideWrapper>
      </ViewWithSidebar>
    </>
  );
};

export default Tasks;
