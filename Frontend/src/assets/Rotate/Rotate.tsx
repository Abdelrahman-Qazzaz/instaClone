import { ReactNode } from "react";

export const Rotate = ({
  children,
  rotate,
}: {
  children: ReactNode;
  rotate: string;
}) => {
  return <div style={{ rotate }}>{children}</div>;
};
