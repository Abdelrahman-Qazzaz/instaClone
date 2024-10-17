import { ReactNode, useMemo } from "react";

import styles from "./FixedPosPage.module.css";

export function FixedPosPage({
  children,
  center,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  const style = useMemo(() => {
    const temp: React.CSSProperties = {};
    if (center) {
      temp.display = "flex";
      temp.justifyContent = "center";
      temp.alignItems = "center";
    }

    return temp;
  }, []);

  return (
    <div style={style} className={`${styles.container}`}>
      {children}
    </div>
  );
}
