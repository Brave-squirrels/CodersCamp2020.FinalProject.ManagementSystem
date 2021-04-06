import React, { useState } from "react";
import { useSelector } from "react-redux";
import { mutateToAxios } from "utils/onChangeForm";

import axios from "axios/axiosMain";

import styles from "./changeDescription.module.scss";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import SuccessHandler from "components/successHandler/successHandler";


const ChangeDescription = () => {
  const teamId = useSelector((state: any) => state.singleTeamData.team._id);

  const descriptionStart = {
    newDescription: {
      val: "",
      type: "text",
      inputType: "input",
      label: "Change description",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 250,
      },
      touched: false,
      valid: false,
    },
    formValid: true,
  };
  

  const [description, setDescription] = useState({
    newDescription: {
      val: "",
      type: "text",
      inputType: "input",
      label: "Change description",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 250,
      },
      touched: false,
      valid: false,
    },
    formValid: false,
  });
  const [loading, setLoading] = useState(false);
  const [changeStatus, setChangeStatus] = useState("");

  const changeTeamDescription = (e: any) => {
    setLoading(true);
    e.preventDefault();
    const formData = mutateToAxios(description);
    axios
      .put(`/teams/${teamId}/changeDescription`, formData, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((response) => {
        setChangeStatus("Description changed!");
        setDescription({ ...descriptionStart });
        setLoading(false)
      })
      .catch((err) => {
        setChangeStatus(err.response.data);
        setLoading(false);
      });
  };


  return (
    <div className={styles.formWrapper}>
      {loading ? (
        <Spinner />
      ) : (
        <FormStructure
          state={description}
          setState={setDescription}
          btnText="Change description"
          formTitle="New description"
          submitted={changeTeamDescription}
          checkPass={false}
        />
      )}
      {changeStatus === "Description changed!" ? (
        <SuccessHandler>{changeStatus}</SuccessHandler>
      ) : (
        <ErrorHandler>{changeStatus}</ErrorHandler>
      )}
    </div>
  );
};

export default ChangeDescription;
