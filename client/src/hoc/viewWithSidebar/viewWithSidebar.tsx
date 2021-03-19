import React from "react";

import styles from "./viewWithSidebar.module.scss";

const ViewWithSidebar = (props: any) => {
  return (
    <div className={styles.Wrapper}>
      {props.children}
    </div>
  );
};

export default ViewWithSidebar;