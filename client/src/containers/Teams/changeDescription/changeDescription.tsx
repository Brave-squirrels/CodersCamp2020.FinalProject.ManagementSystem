import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import AlignVert from "hoc/alignVert/alignVert";

import { changeDesc } from "reduxState/teams/changeDescription";
import { mutateToAxios } from "utils/onChangeForm";
import { RootState } from "reduxState/store";

const ChangeDescription = () => {
  const dispatch = useDispatch();

  const { teamId } = useParams<types.TParams>();

  const teamData = useSelector((state: RootState) => state.singleTeamData);
  const changeStages = useSelector((state: RootState) => state.changeTeamDesc);

  const [description, setDescription] = useState({
    newDescription: {
      val: "",
      inputType: "textarea",
      label: "Change description",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 254,
      },
      touched: true,
      valid: true,
    },
    formValid: true,
  });

  useEffect(() => {
    setDescription((prevState) => {
      return {
        ...prevState,
        newDescription: {
          ...prevState.newDescription,
          val: teamData.team.description,
        },
      };
    });
  }, [teamData.team.description]);

  const changeTeamDescription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = mutateToAxios(description);
    dispatch(changeDesc(teamId, data));
  };

  return (
    <AlignVert>
      {changeStages.loading ? (
        <Spinner />
      ) : (
        <AlignVert>
          <FormStructure
            state={description}
            setState={setDescription}
            btnText="Change description"
            formTitle="New description"
            submitted={changeTeamDescription}
            checkPass={false}
          />
          {changeStages.error && (
            <ErrorHandler>{changeStages.error.response.data}</ErrorHandler>
          )}
        </AlignVert>
      )}
    </AlignVert>
  );
};

export default ChangeDescription;
