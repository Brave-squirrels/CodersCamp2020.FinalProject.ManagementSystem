import React from "react";

interface Props {
  teamId: string;
  children: any;
}

const liItem = (props: Props) => {
  return (
    <li key={props.teamId} id={props.teamId}>
      {props.children}
    </li>
  );
};

export default liItem;
