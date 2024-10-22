import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
export const SlideInLeftToRight = ({
  children,
  show,
}: {
  children: ReactNode;
  show: boolean;
}) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "fit-content" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.4 }}
          onAnimationComplete={() => {
            setShowChildren(true);
          }}
        >
          <div style={{ visibility: showChildren ? "visible" : "hidden" }}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SlideInRightToLeft = () => {
  return <div>SlideInComponents</div>;
};
