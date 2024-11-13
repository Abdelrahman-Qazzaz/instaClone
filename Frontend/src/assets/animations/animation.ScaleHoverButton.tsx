import { IAnimationComponentProps } from "@/assets/animations/IAnimationComponentProps";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";
export const ScaleHoverButton: React.FC<IAnimationComponentProps> = ({
  children,
  style,
  onClick,
}: {
  children: ReactNode;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    onClick && (
      <AnimatePresence>
        <motion.button
          onClick={onClick}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.5 }}
          exit={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          style={style}
        >
          {children}
        </motion.button>
      </AnimatePresence>
    )
  );
};
