import React, { useState } from "react";
import { useSelector } from "react-redux";
import { mutateToAxios } from "utils/onChangeForm";

import axios from "axios/axiosMain";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import SuccessHandler from "components/successHandler/successHandler";
import AlignVert from "hoc/alignVert/alignVert";

const ChangeTitle = () => {
  const teamId = useSelector((state: any) => state.singleTeamData.team._id);

  const titleStart = {
    newTeamName: {
      val: "",
      type: "text",
      inputType: "input",
      label: "Change team name",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      touched: false,
      valid: false,
    },
    formValid: true,
  };

  const [title, setTitle] = useState({
    newTeamName: {
      val: "",
      type: "text",
      inputType: "input",
      label: "Change team name",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      touched: false,
      valid: false,
    },
    formValid: false,
  });
  const [loading, setLoading] = useState(false);
  const [changeStatus, setChangeStatus] = useState("");

  const changeTeamName = (e: any) => {
    setLoading(true);
    e.preventDefault();
    const formData = mutateToAxios(title);
    axios
      .put(`/teams/${teamId}/changeTeamName`, formData, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((response) => {
        setChangeStatus("Team name changed!");
        setTitle({ ...titleStart });
        setLoading(false);
      })
      .catch((err) => {
        setChangeStatus(err.response.data);
        setLoading(false);
      });
  };

  return (
    <AlignVert>
      {loading ? (
        <Spinner />
      ) : (
        <FormStructure
          state={title}
          setState={setTitle}
          btnText="Change team name"
          formTitle="New team name"
          submitted={changeTeamName}
          checkPass={false}
        />
      )}
      {changeStatus === "Team name changed!" ? (
        <SuccessHandler>{changeStatus}</SuccessHandler>
      ) : (
        <ErrorHandler>{changeStatus}</ErrorHandler>
      )}
    </AlignVert>
  );
};

export default ChangeTitle;
