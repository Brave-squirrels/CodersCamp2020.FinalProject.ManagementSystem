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
import CardNote from "components/UI/CardNote/cardNote";

import { mutateToAxios } from "utils/onChangeForm";
import { fetchNotes } from "reduxState/notes/fetchNotes";
import { RootState } from "reduxState/store";
import { deleteNoteFetch } from "reduxState/notes/removeNote";
import { changeNoteFetch } from "reduxState/notes/editNotes";

import styles from "./notes.module.scss";

const Notes = () => {
  //Modal for add new note
  const [modalDisplay, changeDisplay] = useState(false);
  //Modal for edit note
  const [modalEdit, setModalEdit] = useState(false);
  //Store ID of current edit note
  const [edit, setEdit] = useState("");

  const dispatch = useDispatch();
  //Get notes data
  const notesData = useSelector((state: RootState) => state.notesData);
  //Delete notes data
  const deleteState = useSelector((state: RootState) => state.deleteNote);
  //Create notes data
  const createState = useSelector((state: RootState) => state.notesCreate);
  //Edit notes data
  const changeNote = useSelector((state: RootState) => state.changeNote);
  //Current project data
  const projectData = useSelector(
    (state: RootState) => state.singleProjectData
  );
  //Current team data
  const teamData = useSelector((state: RootState) => state.singleTeamData);
  //Params from URL
  const { teamId, projectId } = useParams<types.TParams>();

  //Update notes in UI after every action
  useEffect(() => {
    dispatch(fetchNotes(teamId, projectId));
    changeDisplay(false);
  }, [
    teamId,
    projectId,
    deleteState.success,
    createState.success,
    changeNote.success,
    dispatch,
  ]);

  //Form for edit note object
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

  //Render button to edit/remove base on permission
  const checkPermissions = (id: string, noteId: string): JSX.Element | null => {
    //Enable remove and edit for note author
    if (id === localStorage.getItem("id")) {
      return (
        <div className={styles.buttonsWrapper}>
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
        </div>
      );
    }
    //Enable remove if user is project owner or team moderator
    else if (
      projectData.project.owner.id === id ||
      teamData.team.moderatosId.includes(id)
    ) {
      return (
        <div className={styles.buttonsWrapper}>
          <FontAwesomeIcon
            icon={faTrash}
            className={styles.iconRemove}
            onClick={() => removeHandler(noteId)}
          />
        </div>
      );
    }
    return null;
  };

  //Enable edit note mode
  const editHandler = (id: string) => {
    //Set clicked note in edit mode and display modal
    setEdit(id);
    setModalEdit(true);
    const currentNote = notesData.notes.find((el: any) => el._id === id);
    //Set default value in form
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

  //Submit  edit note fetch
  const sendEdit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const data = mutateToAxios(form);
    dispatch(changeNoteFetch(teamId, projectId, id, data));
    setEdit("");
  };

  //Submit remove fetch
  const removeHandler = (id: string) => {
    dispatch(deleteNoteFetch(teamId, projectId, id));
  };

  return (
    <>
      <Modal show={modalDisplay} onClose={() => changeDisplay(false)}>
        <CreateNote />
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
                  <CardNote
                    key={el._id}
                    title={el.name}
                    content={el.content}
                    author={el.author.name}
                  >
                    <>
                      {checkPermissions(el.author.id, el._id)}

                      {modalEdit && edit === el._id ? (
                        <Modal
                          show={modalEdit}
                          onClose={() => setModalEdit(false)}
                        >
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
                        </Modal>
                      ) : null}
                    </>
                  </CardNote>
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
