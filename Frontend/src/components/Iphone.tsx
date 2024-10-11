import { ReactNode } from "react";

export const Iphone = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        border: "12px solid black",
        borderRadius: "12%",
        width: "270px",
        height: "555px",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};
