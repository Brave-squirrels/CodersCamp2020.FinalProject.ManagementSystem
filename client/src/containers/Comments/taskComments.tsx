import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "reduxState/store";
import * as types from "utils/types";

import CreateComment from "./createComment/createComment";
import Comment from "components/UI/comment/comment";

import styles from "./taskComments.module.scss";

interface Props {
  id: string;
}

const TaskComments = (props: Props) => {
  const commentsData = useSelector((state: RootState) => state.commentsData);

  return (
    <div className={styles.commentsContainer}>
      <CreateComment taskId={props.id} />
      <span className={styles.title}>Comments</span>
      <div className={styles.commentsContent}>
        {commentsData.comments.length > 0 ? (
          <>
            {commentsData.comments.map((el: types.CommentData) => (
              <Comment
                name={el.creator.name}
                content={el.content}
                date={el.date}
                key={el._id}
              />
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
