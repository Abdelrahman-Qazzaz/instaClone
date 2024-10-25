import { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

export const DisplayBelowXL = ({ children }: { children: ReactNode }) => {
  const belowXL = useMediaQuery({ maxWidth: 1199 });

  return belowXL && <div>{children}</div>;
};
