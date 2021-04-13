import React from "react";

import styles from "./errorPage.module.scss";

import pageError from "../../assets/404.png";

const errorPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <img src={pageError} alt="" className={styles.image} />
      <div className={styles.contentWrapper}>
        <span className={styles.subtitle}>Ooops, something went wrong...</span>
      </div>
    </div>
  );
};

export default errorPage;
