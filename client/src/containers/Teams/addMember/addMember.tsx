import React, { useState } from "react";
import { useSelector } from "react-redux";
import { mutateToAxios } from "utils/onChangeForm";

import axios from "axios/axiosMain";

import styles from "./addMember.module.scss";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import SuccessHandler from "components/successHandler/successHandler";


const AddMember = () => {
  const teamId = useSelector((state: any) => state.singleTeamData.team._id);

  const emailStart = {
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
    formValid: true,
  };

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
  const [inviteStatus, setInviteStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const findUser = (e: any) => {
    setInviteStatus('')
    setLoading(true);
    e.preventDefault();
    const formData = mutateToAxios(member);
    axios
      .get(`/users/search/${formData.email}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((response) => addMemberToTeam(response.data._id))
      .catch((err) => {
        setInviteStatus(err.response.data);
        setLoading(false);
      });
  };

  const addMemberToTeam = (memberId: any) => {
    const memberObj = {
      id: memberId,
    };
    axios
      .put(`/teams/${teamId}/addPending`, memberObj, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then(() => {
        setInviteStatus("Send invite!");
        setMember({ ...emailStart });
        setLoading(false);
      })
      .catch((err) => {
        setInviteStatus(err.response.data);
        setLoading(false);
      });
  };

  return (
    <div className={styles.formWrapper}>
      {loading ? (
        <Spinner />
      ) : (
        <FormStructure
          state={member}
          setState={setMember}
          btnText="Send invite"
          formTitle="Add new member"
          submitted={findUser}
          checkPass={false}
        />
      )}
      {inviteStatus === "Send invite!" ? (
        <SuccessHandler>{inviteStatus}</SuccessHandler>
      ) : (
        <ErrorHandler>{inviteStatus}</ErrorHandler>
      )}
    </div>
  );
};

export default AddMember;
