import { IAnimationComponentProps } from "@/assets/animations/IAnimationComponentProps";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";

export const SlideUp: React.FC<IAnimationComponentProps> = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        style={style}
        initial={{ transform: "translate(0,300px)" }}
        animate={{ transform: "translate(0,0px)" }}
        exit={{ transform: "translate(0,300px)" }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
