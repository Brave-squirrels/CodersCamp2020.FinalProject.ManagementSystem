import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import ProjectSidebar from "containers/Projects/Project/projectSidebar/projectSidebar";
import RightSideWrapper from "hoc/rightSideWrapper/rightSideWrapper";
import AddNew from "components/UI/addNew/addNew";
import Modal from "components/Modal/modal";
import CreateNote from "./createNote/createNote";
import EmptyNotification from "components/UI/emptyNotification/emptyNotification";
import SpinnerLight from "components/UI/spinnerLight/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";

import { fetchNotes } from "reduxState/notes/fetchNotes";
import { RootState } from "reduxState/store";
import { deleteNoteFetch } from "reduxState/notes/removeNote";

import styles from "./notes.module.scss";

const Notes = () => {
  const [modalDisplay, changeDisplay] = useState(false);
  const dispatch = useDispatch();
  const notesData = useSelector((state: RootState) => state.notesData);
  const deleteState = useSelector((state: RootState) => state.deleteNote);
  const createState = useSelector((state: RootState) => state.notesCreate);
  const projectData = useSelector(
    (state: RootState) => state.singleProjectData
  );
  const teamData = useSelector((state: RootState) => state.singleTeamData);

  const { teamId, projectId } = useParams<types.TParams>();

  useEffect(() => {
    dispatch(fetchNotes(teamId, projectId));
  }, [teamId, projectId, deleteState.success, createState.success]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Render component base on permissions */
  const checkPermissions = (id: string, noteId: string): JSX.Element | null => {
    if (id === localStorage.getItem("id")) {
      return (
        <>
          <FontAwesomeIcon
            icon={faEdit}
            className={styles.iconEdit}
            onClick={() => editHandler(noteId)}
          />

          <FontAwesomeIcon
            icon={faTrash}
            className={styles.iconRemove}
            onClick={() => removeHandler(noteId)}
          />
        </>
      );
    } else if (
      projectData.project.owner.id === id ||
      teamData.team.moderatosId.includes(id)
    ) {
      return (
        <FontAwesomeIcon
          icon={faTrash}
          className={styles.iconRemove}
          onClick={() => removeHandler(noteId)}
        />
      );
    }
    return null;
  };

  const editHandler = (id: string) => {
    console.log(id);
  };
  const removeHandler = (id: string) => {
    dispatch(deleteNoteFetch(teamId, projectId, id));
  };

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
            {notesData.loading ? (
              <SpinnerLight />
            ) : notesData.error ? (
              <ErrorHandler>{notesData.error.response.data}</ErrorHandler>
            ) : notesData.notes.length > 0 ? (
              <div className={styles.innerWrapper}>
                {notesData.notes.map((el: any) => (
                  <div key={el._id} className={styles.noteCard}>
                    <div className={styles.buttonsWrapper}>
                      {checkPermissions(el.author.id, el._id)}
                    </div>
                    <span className={styles.noteTitle}>{el.name}</span>
                    <div className={styles.noteContent}>{el.content}</div>
                    <span className={styles.noteAuthor}>{el.author.name}</span>
                  </div>
                ))}
              </div>
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
