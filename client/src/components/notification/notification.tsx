import React from "react";

import styles from "./notification.module.scss";

import Button from "../UI/formElements/button/button";

interface Props {
  title: string;
  subTitle: string;
  btnText: string;
  img: any;
}

const notification = (props: Props) => {
  return (
    <div className={styles.notificationContainer}>
      <div className={styles.subContainer}>
        <img src={props.img} alt="Mail Icon" className={styles.icon} />
        <span className={styles.title}>{props.title}</span>
        <span className={styles.subTitle}>{props.subTitle}</span>
        <Button>{props.btnText}</Button>
      </div>
    </div>
  );
};

export default notification;
