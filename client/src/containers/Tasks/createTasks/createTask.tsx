import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import ErrorHandler from "components/errorHandler/errorHandler";
import Spinner from "components/UI/Spinner/spinner";
import AlignVert from "hoc/alignVert/alignVert";

import { mutateToAxios } from "utils/onChangeForm";
import { createTaskFetch } from "reduxState/tasks/createTask";
import { RootState } from "reduxState/store";

const CreateTask = () => {
  const dispatch = useDispatch();
  const createStages = useSelector((state: RootState) => state.createTask);

  const [form, setForm] = useState({
    name: {
      val: "",
      inputType: "input",
      label: "Title",
      type: "text",
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
      label: "Content",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 255,
      },
      touched: false,
      valid: false,
    },
    deadlineDate: {
      val: "",
      inputType: "input",
      type: "date",
      label: "Deadline",
      validation: {
        required: true,
        minDate: Date.now(),
      },
      touched: false,
      valid: false,
    },
    formValid: false,
  });

  const { teamId, projectId } = useParams<types.TParams>();

  const createTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = mutateToAxios(form);
    dispatch(createTaskFetch(teamId, projectId, formData));
  };

  return (
    <AlignVert>
      {createStages.loading ? (
        <Spinner />
      ) : (
        <>
          <FormStructure
            state={form}
            setState={setForm}
            btnText="Create"
            formTitle="Add task"
            submitted={createTaskHandler}
            checkPass={false}
          />
          {createStages.error && (
            <ErrorHandler>{createStages.error.response.data}</ErrorHandler>
          )}
        </>
      )}
    </AlignVert>
  );
};

export default CreateTask;
