import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import { updateMemberInProjectFetch } from "reduxState/projects/updateMember";
import { RootState } from "reduxState/store";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import ErrorHandler from "components/errorHandler/errorHandler";

import styles from "./singleMemberAdd.module.scss";

interface Props {
  userId: string;
  userName: string;
}

const SingleMemberAdd = (props: Props) => {
  const dispatch = useDispatch();

  const { teamId, projectId } = useParams<types.TParams>();
  const editMember = useSelector(
    (state: RootState) => state.updateMemberInProject
  );

  const [form, setForm] = useState({
    status: {
      val: "FrontendDev",
      inputType: "select",
      label: "Role",
      validation: {
        required: true,
      },
      options: {
        front: {
          val: "FrontendDev",
          name: "Frontend Developer",
        },
        back: {
          val: "BackendDev",
          name: "Backend Developer",
        },
        devOps: {
          val: "DevOps",
          name: "DevOps",
        },
        designed: {
          val: "Designer",
          name: "Designer",
        },
      },
      touched: true,
      valid: true,
    },
    formValid: true,
  });

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      member: {
        id: props.userId,
        name: props.userName,
        role: form.status.val,
      },
      delete: false,
    };
    dispatch(updateMemberInProjectFetch(teamId, projectId, data));
  };

  return (
    <>
      <div className={styles.addUserWrapper}>
        <span>{props.userName}</span>
        <div className={styles.formWrapper}>
          <FormStructure
            state={form}
            setState={setForm}
            btnText="Add"
            checkPass={false}
            submitted={(e: React.FormEvent<HTMLFormElement>) =>
              handleAddMember(e)
            }
            additionalClass="formRow"
          />
        </div>
      </div>
      {editMember.error && (
        <ErrorHandler>{editMember.error.response.data}</ErrorHandler>
      )}
    </>
  );
};

export default SingleMemberAdd;
