import styles from "./icon.module.css";

export const HeartIcon = ({ fontSize }: { fontSize?: string }) => {
  return <i style={{ fontSize }} className={`${styles.icon} bi bi-heart`}></i>;
};

export const HeartFillIcon = ({ fontSize }: { fontSize?: string }) => {
  return (
    <i style={{ fontSize }} className={`${styles.icon} bi bi-heart-fill`}></i>
  );
};
