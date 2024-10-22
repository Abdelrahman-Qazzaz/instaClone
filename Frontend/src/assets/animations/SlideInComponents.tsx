import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
export const SlideInLeftToRight = ({ children }: { children: ReactNode }) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "fit-content" }}
      exit={{ width: 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => {
        setShowChildren(true);
      }}
      onAnimationStart={() => {
        if (showChildren) {
          setShowChildren(false);
        }
      }}
    >
      <div style={{ visibility: showChildren ? "visible" : "hidden" }}>
        {children}
      </div>
    </motion.div>
  );
};

export const SlideInRightToLeft = () => {
  return <div>SlideInComponents</div>;
};
