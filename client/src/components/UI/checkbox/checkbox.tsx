import React from "react";

import styles from "./checkbox.module.scss";

const checkbox = (props: any) => {
  return (
    <div>
      <input
        type="checkbox"
        value={props.value}
        checked={props.checked}
        onChange={props.change}
        id={props.id}
        className={props.class}
      />
      <label htmlFor={props.id}> {props.name} </label>
    </div>
  );
};

export default checkbox;
