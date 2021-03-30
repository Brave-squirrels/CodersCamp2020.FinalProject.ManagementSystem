import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import ErrorHandler from "components/errorHandler/errorHandler";
import Spinner from "components/UI/Spinner/spinner";

import { mutateToAxios } from "../../../utils/onChangeForm";
import { createNote } from "reduxState/notes/postNote";
import { RootState } from "reduxState/store";
import { reset } from "reduxState/notes/postNote";

import styles from "./crateNote.module.scss";

const CreateNote = (props: any) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.notesCreate);
  const { teamId, projectId } = useParams<types.TParams>();
  const [inputs, setInputs] = useState({
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
      valid: false,
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
    formValid: false,
  });

  const createNoteHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = mutateToAxios(inputs);
    dispatch(createNote(teamId, projectId, formData));
  };

  let content: JSX.Element = (
    <>
      <FormStructure
        state={inputs}
        setState={setInputs}
        btnText="Create"
        formTitle="Create Note"
        submitted={createNoteHandler}
        checkPass={false}
      />
      {state.error ? (
        <ErrorHandler>{state.error.response.data}</ErrorHandler>
      ) : null}
    </>
  );

  if (state.loading) {
    content = <Spinner />;
  }
  if (state.success) {
    props.doneAction();
    dispatch(reset());
  }

  return <div className={styles.formWrapper}>{content}</div>;
};

export default CreateNote;
