import React, { useState } from "react";
import { mutateToAxios } from "utils/onChangeForm";

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

  const submitForm = (e: any) => {
    e.preventDefault();
    const formData = mutateToAxios(project);
    console.log(formData);
  };

  return (
    <FormStructure
      state={project}
      setState={setProject}
      btnText="Create"
      formTitle="Create project"
      submitted={submitForm}
      checkPass={false}
    />
  );
};

export default CreateProject;
