import React, { useState } from "react";
import axios from "axios/axiosMain";
import onChangeForm, { mutateToAxios } from "utils/onChangeForm";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";

const CreateTeam = () => {
  const [team, setTeam] = useState({
    teamName: {
      val: "",
      type: "text",
      inputType: "input",
      label: "Team Name",
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
      label: "Team Description",
      validation: {
        required: true,
        minLength: 0,
        maxLength: 255,
      },
      touched: false,
      valid: false,
    },
    formValid: false,
  });

  const createTeam = async (e: any) => {
    e.preventDefault();

    const formData = mutateToAxios(team);
    axios
      .post("/teams", formData, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then(() => console.log("succes!"))
      .catch((err) => console.log(err.message));
  };

  const onChangeTeam = (
    event: { target: HTMLInputElement },
    inputType: keyof typeof team
  ) => {
    /* Mutate and valid state */
    const { updatedFields, validForm } = onChangeForm(event, inputType, team);

    /* Set up new state */
    setTeam((prevState) => {
      return {
        ...prevState,
        ...updatedFields,
        formValid: validForm,
      };
    });
  };

  return (
    <FormStructure
      state={team}
      onChangeHandler={onChangeTeam}
      btnText="Create"
      formTitle="Create team"
      submitted={createTeam}
    />
  );
};

export default CreateTeam;
