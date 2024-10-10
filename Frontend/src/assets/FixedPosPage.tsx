import { ReactNode } from "react";

export function FixedPosPage({
  children,
  justifyContent = "center",
  alignItems = "center",
}: {
  children: ReactNode;
  justifyContent?: "center" | "space-around";
  alignItems?: "center";
}) {
  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent,
        alignItems,
      }}
    >
      {children}
    </div>
  );
}
