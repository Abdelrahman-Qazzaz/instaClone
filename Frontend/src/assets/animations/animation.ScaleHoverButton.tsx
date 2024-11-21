import { IAnimationComponentProps } from "@/assets/animations/IAnimationComponentProps";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";

interface IScaleHoverButtonProps extends IAnimationComponentProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const ScaleHoverButton: React.FC<IScaleHoverButtonProps> = ({
  children,
  onClick,
  disabled,
  style,
}: {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: CSSProperties;
}) => {
  return (
    onClick && (
      <AnimatePresence>
        <motion.button
          disabled={disabled}
          onClick={onClick}
          initial={{ scale: 1 }}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          exit={{ scale: 1 }}
          transition={{ duration: 0.15 }}
          style={{ ...style, opacity: disabled ? 0.6 : 1 }}
        >
          {children}
        </motion.button>
      </AnimatePresence>
    )
  );
};
