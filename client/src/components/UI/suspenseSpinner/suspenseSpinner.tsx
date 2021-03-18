import React from "react";

import styles from "./suspenseSpinner.module.scss";

const spinner = () => {
  return (
    <div className={styles.spinnerCon}>
      <div className={styles.Loader}>Loading...</div>
    </div>
  );
};

export default spinner;
