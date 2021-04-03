import React from "react";

import styles from "./checkbox.module.scss";

interface Props {
  value: string;
  checked: boolean;
  change: (e: any) => void;
  id: string;
  class: string;
  name: string;
}

const checkbox = (props: Props) => {
  return (
    <div>
      <input
        type="checkbox"
        value={props.value}
        checked={props.checked}
        onChange={props.change}
        id={props.id}
        className={[props.class, styles.styledCheckbox].join(" ")}
      />
      <label htmlFor={props.id} className={styles.checkboxLabel}>
        {" "}
        {props.name}{" "}
      </label>
    </div>
  );
};

export default checkbox;
