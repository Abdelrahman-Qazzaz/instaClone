import { CSSProperties, ReactNode } from "react";

export interface IAnimationComponentProps {
  condition?: boolean;
  children: ReactNode;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
