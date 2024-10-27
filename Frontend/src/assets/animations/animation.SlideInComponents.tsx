import { motion } from "framer-motion";
import { CSSProperties, ReactNode, useState } from "react";
export const SlideInLeftToRight = ({
  children,
  style,
}: {
  children: ReactNode;
  style: CSSProperties;
}) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <motion.div
      //style={style}
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
      <div
        style={{ visibility: showChildren ? "visible" : "hidden", ...style }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export const SlideInRightToLeft = () => {
  return <div>SlideInComponents</div>;
};
