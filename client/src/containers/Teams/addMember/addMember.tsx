import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import AlignVert from "hoc/alignVert/alignVert";

import { RootState } from "reduxState/store";
import { findUserFetch } from "reduxState/teams/findUser";

const AddMember = () => {
  const dispatch = useDispatch();
  const { teamId } = useParams<types.TParams>();

  const foundUser = useSelector((state: RootState) => state.findUser);
  const addPending = useSelector((state: RootState) => state.addTeamMember);

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

  const addMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(findUserFetch(member.email.val, teamId));
  };

  return (
    <AlignVert>
      {addPending.loading || foundUser.loading ? (
        <Spinner />
      ) : (
        <>
          <FormStructure
            state={member}
            setState={setMember}
            btnText="Send invite"
            formTitle="Add new member"
            submitted={addMember}
            checkPass={false}
          />
          {addPending.error ? (
            <ErrorHandler>{addPending.error.response.data}</ErrorHandler>
          ) : (
            foundUser.error && (
              <ErrorHandler>{foundUser.error.response.data}</ErrorHandler>
            )
          )}
        </>
      )}
    </AlignVert>
  );
};

export default AddMember;
