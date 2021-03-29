import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import ProjectSidebar from "containers/Projects/Project/projectSidebar/projectSidebar";
import RightSideWrapper from "hoc/rightSideWrapper/rightSideWrapper";
import AddNew from "components/UI/addNew/addNew";
import Modal from "components/Modal/modal";
import CreateNote from "./createNote/createNote";
import EmptyNotification from "components/UI/emptyNotification/emptyNotification";

import { fetchNotes } from "reduxState/notes/fetchNotes";
import { RootState } from "reduxState/store";

import styles from "./notes.module.scss";

const Notes = () => {
  const [modalDisplay, changeDisplay] = useState(false);
  const dispatch = useDispatch();
  const notesData = useSelector((state: RootState) => state.notesData);
  const { teamId, projectId } = useParams<types.TParams>();

  useEffect(() => {
    dispatch(fetchNotes(teamId, projectId));
  }, [teamId, projectId, modalDisplay]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Modal show={modalDisplay} onClose={() => changeDisplay(false)}>
        <CreateNote doneAction={() => changeDisplay(false)} />
      </Modal>
      <ViewWithSidebar>
        <ProjectSidebar />
        <RightSideWrapper title={"Notes"}>
          <div className={styles.container}>
            <div className={styles.createBtnWrapper}>
              <AddNew clicked={() => changeDisplay(true)} />
            </div>
            {notesData.notes.length > 0 ? (
              notesData.notes.map((el: any) => <div key={el.id}>{el.name}</div>)
            ) : (
              <EmptyNotification>
                There is no notes in this project
              </EmptyNotification>
            )}
          </div>
        </RightSideWrapper>
      </ViewWithSidebar>
    </>
  );
};

export default Notes;
