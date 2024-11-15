import { IAnimationComponentProps } from "@/assets/animations/IAnimationComponentProps";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";

interface IScaleHoverButtonProps extends IAnimationComponentProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ScaleHoverButton: React.FC<IScaleHoverButtonProps> = ({
  children,
  onClick,
  style,
}: {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}) => {
  return (
    onClick && (
      <AnimatePresence>
        <motion.button
          onClick={onClick}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          exit={{ scale: 1 }}
          transition={{ duration: 0.15 }}
          style={style}
        >
          {children}
        </motion.button>
      </AnimatePresence>
    )
  );
};
