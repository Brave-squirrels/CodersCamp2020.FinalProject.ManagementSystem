import React from "react";

import styles from "./modal.module.scss";

interface Props {
  children: JSX.Element | string;
  show: boolean;
  onClose: () => void;
}

const modal = (props: Props) => {
  let modalClasses = [styles.modalCon];
  if (props.show) {
    modalClasses = [styles.modalCon, styles.display];
  }
  return (
    <div className={modalClasses.join(" ")} onClick={props.onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {props.children}
        <span onClick={props.onClose} className={styles.modalClose}>
          &#10005;
        </span>
      </div>
    </div>
  );
};

export default modal;
