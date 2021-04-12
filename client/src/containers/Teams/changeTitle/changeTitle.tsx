import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import AlignVert from "hoc/alignVert/alignVert";

import { changeTitle } from "reduxState/teams/changeTitle";
import { mutateToAxios } from "utils/onChangeForm";
import { RootState } from "reduxState/store";

const ChangeTeamTitle = () => {
  const dispatch = useDispatch();
  const teamData = useSelector((state: RootState) => state.singleTeamData.team);

  const changeTitleState = useSelector(
    (state: RootState) => state.changeTeamTitle
  );

  const { teamId } = useParams<types.TParams>();

  const [title, setTitle] = useState({
    newTeamName: {
      val: "",
      type: "text",
      inputType: "input",
      label: "Change team name",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 24,
      },
      touched: true,
      valid: true,
    },
    formValid: true,
  });

  useEffect(() => {
    setTitle((prevState) => {
      return {
        ...prevState,
        newTeamName: {
          ...prevState.newTeamName,
          val: teamData.teamName,
        },
      };
    });
  }, [teamData.teamName]);

  const changeTeamName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = mutateToAxios(title);
    dispatch(changeTitle(teamId, formData));
  };

  return (
    <AlignVert>
      {changeTitleState.loading ? (
        <Spinner />
      ) : (
        <AlignVert>
          <FormStructure
            state={title}
            setState={setTitle}
            btnText="Change team name"
            formTitle="New team name"
            submitted={changeTeamName}
            checkPass={false}
          />
          {changeTitleState.error && (
            <ErrorHandler>{changeTitleState.error.response.data}</ErrorHandler>
          )}
        </AlignVert>
      )}
    </AlignVert>
  );
};

export default ChangeTeamTitle;
