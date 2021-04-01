import React from "react";

interface Props {
  id: string;
}

/* Content of single task */
const singleTask = (props: Props) => {
  return <div>{props.id}</div>;
};

export default singleTask;
