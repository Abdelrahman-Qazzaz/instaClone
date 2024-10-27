import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
export const FadeInComponent = ({
  children,
  durationInSeconds,
}: {
  children: ReactNode;
  durationInSeconds: number;
}) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <motion.div
      //style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: durationInSeconds * 1000 }}
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
