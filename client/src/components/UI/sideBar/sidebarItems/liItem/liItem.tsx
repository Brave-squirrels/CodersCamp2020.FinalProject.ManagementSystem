import React from "react";

interface Props {
  teamId: string;
  children: JSX.Element[];
}

const liItem = (props: Props) => {
  return (
    <li id={props.teamId} key={`${props.teamId}lili`}>
      {props.children}
    </li>
  );
};

export default liItem;
