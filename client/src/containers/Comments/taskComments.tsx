import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reduxState/store";
import * as types from "utils/types";
import { useParams } from "react-router-dom";

import CreateComment from "./createComment/createComment";
import Comment from "components/UI/comment/comment";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import FormStructure from "components/UI/formLogged/formStructure/formStructure";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./taskComments.module.scss";

import { deleteCommentFetch } from "reduxState/comments/deleteComment";
import { editCommentFetch } from "reduxState/comments/editComment";
import { mutateToAxios } from "utils/onChangeForm";

interface Props {
  id: string;
}

const TaskComments = (props: Props) => {
  const dispatch = useDispatch();

  const commentsData = useSelector((state: RootState) => state.commentsData);
  const projectData = useSelector(
    (state: RootState) => state.singleProjectData
  );
  const deleteStages = useSelector((state: RootState) => state.commentsDelete);
  const editStages = useSelector((state: RootState) => state.commentEdit);

  const { teamId, projectId } = useParams<types.TParams>();

  const [currentCommentDelete, setCurrentCommentDelete] = useState("");
  const [editComment, setEditComment] = useState(false);
  const [currentEditComment, setCurrentEditComment] = useState("");

  const [editForm, setEditForm] = useState({
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

  useEffect(() => {
    const currentValue =
      currentEditComment === ""
        ? ""
        : commentsData.comments.find(
            (el: types.CommentData) => el._id === currentEditComment
          )!.content;
    setEditForm((prevState) => ({
      ...prevState,
      content: {
        ...prevState.content,
        val: currentValue,
      },
    }));
  }, [currentEditComment, commentsData.comments]);

  const editHandler = (commentId: string) => {
    setCurrentEditComment(commentId);
    setEditComment(!editComment);
  };

  const removeHandler = (commentId: string) => {
    setCurrentCommentDelete(commentId);
    dispatch(deleteCommentFetch(teamId, projectId, props.id, commentId));
  };

  const submitEditHandler = (
    event: React.FormEvent<HTMLFormElement>,
    commentId: string
  ) => {
    event.preventDefault();
    const formData = mutateToAxios(editForm);
    dispatch(
      editCommentFetch(teamId, projectId, props.id, commentId, formData)
    );
  };

  const checkPermission = (commentId: string, authorId: string) => {
    if (localStorage.getItem("id") === authorId) {
      return (
        <div className={styles.buttonsWrapper}>
          <FontAwesomeIcon
            icon={faEdit}
            className={styles.iconEdit}
            onClick={() => editHandler(commentId)}
          />

          <FontAwesomeIcon
            icon={faTrash}
            className={styles.iconRemove}
            onClick={() => removeHandler(commentId)}
          />
        </div>
      );
    } else if (localStorage.getItem("id") === projectData.project.owner.id) {
      return (
        <div className={styles.buttonsWrapper}>
          <FontAwesomeIcon
            icon={faTrash}
            className={styles.iconRemove}
            onClick={() => removeHandler(commentId)}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <CreateComment taskId={props.id} />
      <span className={styles.title}>Comments</span>
      <div className={styles.commentsContent}>
        {commentsData.comments.length > 0 ? (
          <>
            {commentsData.comments.map((comment: types.CommentData) => (
              <div key={comment._id}>
                {currentCommentDelete === comment._id &&
                deleteStages.loading ? (
                  <Spinner key={comment._id} />
                ) : (
                  <div
                    className={styles.singleCommentWrapper}
                    key={comment._id}
                  >
                    {checkPermission(comment._id, comment.creator.id)}
                    {editStages.loading ? (
                      <Spinner key={comment._id} />
                    ) : (
                      <>
                        {currentEditComment === comment._id && editComment ? (
                          <div
                            className={styles.editFormWrapper}
                            key={comment._id}
                          >
                            <FormStructure
                              state={editForm}
                              setState={setEditForm}
                              btnText="Edit"
                              formTitle="Edit comment"
                              checkPass={false}
                              submitted={(
                                e: React.FormEvent<HTMLFormElement>
                              ) => submitEditHandler(e, comment._id)}
                              key={comment._id}
                            />
                            {editStages.error && (
                              <ErrorHandler>
                                {editStages.error.response.data}
                              </ErrorHandler>
                            )}
                            {editStages.success && setEditComment(false)}
                          </div>
                        ) : (
                          <Comment
                            name={comment.creator.name}
                            content={comment.content}
                            date={comment.date}
                            key={comment._id}
                          />
                        )}
                      </>
                    )}

                    {currentCommentDelete === comment._id &&
                      deleteStages.error && (
                        <ErrorHandler key={comment._id}>
                          {deleteStages.error.response.data}
                        </ErrorHandler>
                      )}
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <span className={styles.emptyNotification}>
            There is no comments in this task
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskComments;
