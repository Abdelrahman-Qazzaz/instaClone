import { ReactNode } from "react";

export const StyledButton = ({ children }: { children: ReactNode }) => {
  const className = `border-0 text-center`;
  return <div className={className}>{children}</div>;
};
