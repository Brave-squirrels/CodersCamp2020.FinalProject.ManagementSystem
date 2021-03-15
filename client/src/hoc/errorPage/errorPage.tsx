import React from "react";

import styles from "./errorPage.module.scss";

import wrench from "../../assets/wrench.png";

const errorPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.title}>401</h1>
      <div className={styles.contentWrapper}>
        <span className={styles.subtitle}>Ooops, something went wrong</span>
        <img src={wrench} alt="Wrench" className={styles.image} />
      </div>
    </div>
  );
};

export default errorPage;
