import { ReactNode, useMemo } from "react";

export function FixedPosPage({
  children,
  center,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  const style = useMemo(() => {
    const temp: React.CSSProperties = {
      position: "fixed",
      height: "100vh",
      width: "100vw",
      zIndex: 1,
    };
    if (center) {
      temp.display = "flex";
      temp.justifyContent = "center";
      temp.alignItems = "center";
    }
    return temp;
  }, []);

  return <div style={style}>{children}</div>;
}
