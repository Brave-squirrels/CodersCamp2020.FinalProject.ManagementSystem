import React, { useState } from "react";
import axios from "axios/axiosMain";
import { mutateToAxios } from "utils/onChangeForm";

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
    /* Transform data to axios format */
    const formData = mutateToAxios(team);
    axios
      .post("/teams", formData, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then(() => console.log("succes!"))
      .catch((err) => console.log(err.message));
  };

  return (
    <FormStructure
      state={team}
      setState={setTeam}
      btnText="Create"
      formTitle="Create team"
      submitted={createTeam}
      checkPass={false}
    />
  );
};

export default CreateTeam;
