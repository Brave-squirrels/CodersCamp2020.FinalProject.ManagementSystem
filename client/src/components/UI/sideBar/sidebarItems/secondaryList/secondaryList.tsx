import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import classes from "./secondaryList.module.scss";

interface Props {
  children: JSX.Element[];
}

const secondaryList = (props: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.5,
            duration: 0.5,
          },
        }}
      >
        <ul className={classes.secondaryList}> {props.children} </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default secondaryList;
