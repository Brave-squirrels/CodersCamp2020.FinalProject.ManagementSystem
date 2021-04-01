import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import styles from "./rightSideWrapper.module.scss";

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
}

const rightSideWrapper = (props: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        }}
      >
        <div className={styles.rightSideWrapper}>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>{props.title}</h1>
            {props.children}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default rightSideWrapper;
