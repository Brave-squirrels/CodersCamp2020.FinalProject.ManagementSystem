import React from "react";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children: JSX.Element | string | JSX.Element[];
}

const opacityWrapper = (props: Props) => {
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
        exit={{
          opacity: 0,
          transition: {
            delay: 0.2,
            duration: 0.3,
          },
        }}
      >
        {" "}
        {props.children}{" "}
      </motion.div>{" "}
    </AnimatePresence>
  );
};

export default opacityWrapper;
