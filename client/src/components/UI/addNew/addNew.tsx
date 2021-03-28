import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "./addNew.module.scss";

const addNew = (props: any) => {
  return (
    <div className={styles.iconWrapper} onClick={props.clicked}>
      New
      <FontAwesomeIcon icon={faPlus} />
    </div>
  );
};

export default addNew;
