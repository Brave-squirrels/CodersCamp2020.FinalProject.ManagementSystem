import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";

import { mutateToAxios } from "utils/onChangeForm";

import { createProject } from "reduxState/createProject";
import { RootState } from "reduxState/store";

const CreateProject = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const createProjectState = useSelector(
    (state: RootState) => state.createProjectSlice
  );
  const [project, setProject] = useState({
    projectName: {
      val: "",
      type: "text",
      inputType: "input",
      label: "Project Name",
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
      label: "Project Description",
      validation: {
        required: false,
        minLength: 0,
        maxLength: 255,
      },
      touched: false,
      valid: true,
    },
    deadline: {
      val: "",
      type: "date",
      inputType: "input",
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

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = mutateToAxios(project);
    dispatch(createProject("605a457b0282ce3c5cb9fd46", data));
  };

  if (createProjectState.success) {
    history.push(
      `/teams/${createProjectState.teamId}/projects/${createProjectState.projectId}`
    );
  }

  return (
    <>
      {createProjectState.loading ? (
        <Spinner />
      ) : (
        <>
          <FormStructure
            state={project}
            setState={setProject}
            btnText="Create"
            formTitle="Create project"
            submitted={submitForm}
            checkPass={false}
          />
          {createProjectState.error && (
            <ErrorHandler>
              {createProjectState.error.response.data}
            </ErrorHandler>
          )}
        </>
      )}
    </>
  );
};

export default CreateProject;
