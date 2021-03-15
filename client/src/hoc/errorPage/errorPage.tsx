import React from "react";

import styles from "./errorPage.module.scss";

const errorPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>Page Not Found</h1>
    </div>
  );
};

export default errorPage;
