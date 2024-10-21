import { ReactNode } from "react";

export const DisplayBelowXL = ({ children }: { children: ReactNode }) => {
  return <div className="d-block d-xl-none">{children}</div>;
};
