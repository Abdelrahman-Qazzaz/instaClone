import { IAnimationComponentProps } from "@/assets/animations/IAnimationComponentProps";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";

interface ISlideInLeftToRightProps extends IAnimationComponentProps {
  condition: boolean;
}

export const SlideInLeftToRight: React.FC<ISlideInLeftToRightProps> = ({
  children,
  condition,
  style,
}: {
  children: ReactNode;
  condition: boolean;
  style?: CSSProperties;
}) => {
  return (
    <AnimatePresence>
      {condition && (
        <motion.div
          style={style}
          initial={{ width: 0 }}
          animate={{ width: "fit-content" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div style={style}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SlideInRightToLeft = () => {
  return <div>SlideInComponents</div>;
};
