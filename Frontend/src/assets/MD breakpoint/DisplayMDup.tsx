import { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

export const DisplayMDup = ({ children }: { children: ReactNode }) => {
  const MDup = useMediaQuery({ minWidth: 768 });
  return MDup && <div>{children}</div>;
};
