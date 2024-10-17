import { ReactNode } from "react";
import styles from "./Iphone.module.css";
export const Iphone = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={styles.container}
      style={{
        borderRadius: "12%",
        width: "270px",
        height: "555px",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};
