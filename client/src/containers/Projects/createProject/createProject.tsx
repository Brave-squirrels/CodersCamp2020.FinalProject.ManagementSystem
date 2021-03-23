import React, { useState } from "react";
import onChangeForm, { mutateToAxios } from "utils/onChangeForm";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";

const CreateProject = () => {
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
    description: {
      val: "",
      inputType: "textarea",
      label: "Project Description",
      validation: {
        required: true,
        minLength: 0,
        maxLength: 255,
      },
      touched: false,
      valid: false,
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

  const onChangeProject = (
    event: { target: HTMLInputElement },
    inputType: keyof typeof project
  ) => {
    /* Mutate and valid state */
    onChangeForm(event, inputType, project, setProject);
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    const formData = mutateToAxios(project);
    console.log(formData);
  };

  return (
    <FormStructure
      state={project}
      onChangeHandler={onChangeProject}
      btnText="Create"
      formTitle="Create project"
      submitted={submitForm}
    />
  );
};

export default CreateProject;
