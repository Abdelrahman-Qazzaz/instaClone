import { ReactNode } from "react";
import { Toast as BSToast, ToastHeaderProps } from "react-bootstrap";
import styles from "./Toast.module.css";
import { SlideUp } from "@/assets/animations/animation.SlideUpComponent";

export const Toast = ({ children }: { children: ReactNode }) => {
  return (
    <SlideUp
      style={{
        zIndex: 5,
        position: "fixed",
        bottom: 0,
        right: 0,
        margin: "2rem",
      }}
    >
      <BSToast className={styles.container}>
        <BSToast.Header closeButton={false} className={styles.header}>
          <div className="me-auto text fw-normal">InstaClone</div>
        </BSToast.Header>
        <BSToast.Body className={`${styles.body} text fw-light`}>
          {children}
        </BSToast.Body>
      </BSToast>
    </SlideUp>
  );
};
