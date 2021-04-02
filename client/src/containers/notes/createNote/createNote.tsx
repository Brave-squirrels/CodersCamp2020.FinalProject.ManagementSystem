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

import styles from "./crateNote.module.scss";

const CreateNote = () => {
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

  return (
    <div className={styles.formWrapper}>
      {state.loading ? (
        <Spinner />
      ) : (
        <>
          <FormStructure
            state={inputs}
            setState={setInputs}
            btnText="Create"
            formTitle="Create Note"
            submitted={createNoteHandler}
            checkPass={false}
          />
          {state.error && (
            <ErrorHandler>{state.error.response.data}</ErrorHandler>
          )}
        </>
      )}
    </div>
  );
};

export default CreateNote;
