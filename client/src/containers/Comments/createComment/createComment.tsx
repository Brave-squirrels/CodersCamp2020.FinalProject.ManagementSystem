import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";

import { createCommentFetch } from "reduxState/comments/postComment";

import { mutateToAxios } from "utils/onChangeForm";
import { RootState } from "reduxState/store";

import styles from "./createComment.module.scss";

interface Props {
  taskId: string;
}

const CreateComment = (props: Props) => {
  const dispatch = useDispatch();

  const createRedux = useSelector((state: RootState) => state.commentCreate);

  const { teamId, projectId } = useParams<types.TParams>();

  const [form, setForm] = useState({
    content: {
      val: "",
      inputType: "textarea",
      label: "Comment text",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 255,
      },
      valid: false,
      touched: false,
    },
    formValid: false,
  });

  const handlePostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = mutateToAxios(form);
    dispatch(createCommentFetch(teamId, projectId, props.taskId, formData));
  };

  return (
    <div className={styles.formWrapper}>
      {createRedux.loading ? (
        <Spinner />
      ) : (
        <>
          <FormStructure
            state={form}
            setState={setForm}
            btnText="Create"
            formTitle="Add comment"
            submitted={handlePostComment}
            checkPass={false}
          />
          {createRedux.error && (
            <ErrorHandler>{createRedux.error.response.data}</ErrorHandler>
          )}
        </>
      )}
    </div>
  );
};

export default CreateComment;
