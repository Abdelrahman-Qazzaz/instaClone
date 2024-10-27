import { ReactNode } from "react";

export const Panel = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 3,
      }}
    >
      {children}
    </div>
  );
};
