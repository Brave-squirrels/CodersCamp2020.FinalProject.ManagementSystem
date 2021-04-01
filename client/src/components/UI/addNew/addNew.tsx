import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "./addNew.module.scss";

interface Props {
  clicked: () => void;
  title?: string;
}

const addNew = (props: Props) => {
  return (
    <div className={styles.iconWrapper} onClick={props.clicked}>
      {props.title}
      <FontAwesomeIcon icon={faPlus} />
    </div>
  );
};

export default addNew;
