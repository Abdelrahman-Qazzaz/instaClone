import { motion } from "framer-motion";
import { ReactNode } from "react";
export const SlideInLeftToRight = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "fit-content" }}
      exit={{ width: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export const SlideInRightToLeft = () => {
  return <div>SlideInComponents</div>;
};
