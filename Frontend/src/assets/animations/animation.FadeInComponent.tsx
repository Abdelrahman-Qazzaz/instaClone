import { IAnimationComponentProps } from "@/assets/animations/IAnimationComponentProps";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";
export const FadeInComponent: React.FC<IAnimationComponentProps> = ({
  condition,
  children,
  style,
}: {
  condition: boolean;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <AnimatePresence>
      {condition && (
        <motion.div
          //style={style}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div style={style}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
