import { CSSProperties } from "react";

export const BlackBackground = ({ style }: { style?: CSSProperties }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        opacity: 0.4,
        zIndex: 2,
        ...style,
      }}
    />
  );
};
