import { CSSProperties, ReactNode, useEffect, useMemo, useState } from "react";

import styles from "./FixedPosPage.module.css";
import { useOffsetStore } from "@/store/useOffsetStore";

export function FixedPosPage({
  children,
  center,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  const { marginLeft, marginBottom, marginTop } = useOffsetStore(
    (state) => state
  );
  // const style = useMemo(() => {
  //   const temp: React.CSSProperties = {};
  //   if (center) {
  //     temp.display = "flex";
  //     temp.justifyContent = "center";
  //     temp.alignItems = "center";
  //   }

  //   return temp;
  // }, []);

  const [style, setStyle] = useState<CSSProperties>({
    marginLeft,
    marginBottom,
    marginTop,
  });
  useEffect(() => {
    setStyle((prev) => {
      let temp: CSSProperties = {
        marginLeft,
        marginBottom,
        marginTop,
        border: "2px solid red",
        width: `calc(100vw - ${marginLeft}px)`,
        height: `calc(100vh - ${marginTop}px - ${marginBottom}px)`,
      };
      if (center)
        temp = {
          ...temp,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        };
      return {
        ...prev,
        ...temp,
      };
    });
  }, [marginLeft, marginBottom, marginTop]);
  return (
    <div style={style} className={`${styles.container}`}>
      {children}
    </div>
  );
}
