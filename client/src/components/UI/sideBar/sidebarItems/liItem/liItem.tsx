import React from "react";

interface Props {
  teamId: string;
  children: any;
}

const liItem = (props: Props) => {
  return <li id={props.teamId}>{props.children}</li>;
};

export default liItem;
