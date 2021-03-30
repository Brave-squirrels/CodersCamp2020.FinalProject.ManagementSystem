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
import FormStructure from "components/UI/formLogged/formStructure/formStructure";

import { mutateToAxios } from "utils/onChangeForm";
import { fetchNotes } from "reduxState/notes/fetchNotes";
import { RootState } from "reduxState/store";
import { deleteNoteFetch } from "reduxState/notes/removeNote";
import { changeNoteFetch } from "reduxState/notes/editNotes";

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
  const changeNote = useSelector((state: RootState) => state.changeNote);
  const teamData = useSelector((state: RootState) => state.singleTeamData);

  const [edit, setEdit] = useState({
    edit: false,
    editedNote: "",
  });

  const { teamId, projectId } = useParams<types.TParams>();

  useEffect(() => {
    dispatch(fetchNotes(teamId, projectId));
  }, [
    teamId,
    projectId,
    deleteState.success,
    createState.success,
    changeNote.success,
    dispatch,
  ]);

  const [form, setForm] = useState({
    name: {
      val: "",
      inputType: "input",
      type: "text",
      label: "Title",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 24,
      },
      touched: false,
      valid: true,
    },
    content: {
      val: "",
      inputType: "textarea",
      label: "Note content",
      validation: {
        required: true,
        minLength: 0,
        maxLength: 254,
      },
      touched: false,
      valid: true,
    },
    formValid: true,
  });

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

  /* Enable edit mode */
  const editHandler = (id: string) => {
    setEdit((prevState) => {
      return {
        ...prevState,
        edit: !prevState.edit,
        editedNote: id,
      };
    });
    const currentNote = notesData.notes.find((el: any) => el._id === id);
    setForm((prevState) => {
      return {
        ...prevState,
        name: {
          ...prevState.name,
          val: currentNote.name,
        },
        content: {
          ...prevState.content,
          val: currentNote.content,
        },
      };
    });
  };

  /* Dispatch PUT fetch */
  const sendEdit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const data = mutateToAxios(form);
    dispatch(changeNoteFetch(teamId, projectId, id, data));
    setEdit({ edit: false, editedNote: "" });
  };

  /* Dispatch DELETE fetch */
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
            {notesData.loading || changeNote.loading ? (
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

                    {edit.edit && edit.editedNote === el._id ? (
                      <>
                        <FormStructure
                          state={form}
                          setState={setForm}
                          btnText="Edit"
                          formTitle="Edit note"
                          submitted={(e: any) => sendEdit(e, el._id)}
                          checkPass={false}
                        />
                        {changeNote.error ? (
                          <ErrorHandler>
                            {changeNote.error.response.data}
                          </ErrorHandler>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <span className={styles.noteTitle}>{el.name}</span>
                        <div className={styles.noteContent}>{el.content}</div>
                      </>
                    )}

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
