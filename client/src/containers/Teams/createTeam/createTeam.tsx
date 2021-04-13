import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mutateToAxios } from "utils/onChangeForm";
import { Redirect } from "react-router-dom";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import AlignVert from "hoc/alignVert/alignVert";

import { createTeam, clear } from "reduxState/createTeam";
import { RootState } from "reduxState/store";

const CreateTeam = () => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state: RootState) => state.createTeamSlice);

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
        required: false,
        minLength: 0,
        maxLength: 255,
      },
      touched: false,
      valid: true,
    },
    formValid: false,
  });

  const createTeamHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* Transform data to axios format */
    const formData = mutateToAxios(team);
    dispatch(createTeam(formData));
  };

  if (reduxState.success) {
    setTimeout(() => {
      dispatch(clear());
    }, 2000);
  }

  return (
    <AlignVert>
      {reduxState.loading ? (
        <Spinner />
      ) : (
        <FormStructure
          state={team}
          setState={setTeam}
          btnText="Create"
          formTitle="Create team"
          submitted={createTeamHandler}
          checkPass={false}
        />
      )}
      {reduxState.error && (
        <ErrorHandler>{reduxState.error.response.data}</ErrorHandler>
      )}
      {reduxState.success && <Redirect to={`/teams/${reduxState.teamId}`} />}
    </AlignVert>
  );
};

export default CreateTeam;
