import { ReactNode } from "react";

export const DisplayBelowMD = ({ children }: { children: ReactNode }) => {
  return <div className="d-md-none d-block">{children}</div>;
};
