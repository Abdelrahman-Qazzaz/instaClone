import { ReactNode } from "react";

export const DisplayMDup = ({ children }: { children: ReactNode }) => {
  return <div className="d-none d-md-block">{children}</div>;
};
