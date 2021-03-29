import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mutateToAxios } from "utils/onChangeForm";
import { Redirect } from "react-router-dom";

import axios from "axios/axiosMain";

import styles from "./addMember.module.scss";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";

import { createTeam, clear } from "reduxState/createTeam";
import { RootState } from "reduxState/store";

const AddMember = () => {
  const teamId = useSelector((state: RootState) => state.singleTeamData.team._id);

  const [member, setMember] = useState({
    email: {
      val: "",
      type: "text",
      inputType: "input",
      label: "New member email",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 24,
      },
      touched: false,
      valid: false,
    },
    formValid: false,
  });

  const addMemberHandler = (e: any) => {
    e.preventDefault();
    const formData = mutateToAxios(member);
    axios
      .get(`/users/search/${formData.email}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((response) => addMemberToTeam(response.data._id))
      .catch((err) => console.log(err.response.data));
  };

  
  const addMemberToTeam = (memberId : any) => {
    const memberObj = {
      id: memberId
    }
    axios
      .put(`/teams/${teamId}/addPending`, memberObj, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then(() => console.log("succes!"))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <FormStructure
      state={member}
      setState={setMember}
      btnText="Send invite"
      formTitle="Add new member"
      submitted={addMemberHandler}
      checkPass={false}
    />
  );
};

export default AddMember;
