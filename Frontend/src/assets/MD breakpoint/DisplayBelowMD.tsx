import { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

export const DisplayBelowMD = ({ children }: { children: ReactNode }) => {
  const belowMD = useMediaQuery({ maxWidth: 767 });
  return belowMD && <div>{children}</div>;
};
