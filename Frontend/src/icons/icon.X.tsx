import styles from "./icon.module.css";
export const XIcon = ({ fontSize }: { fontSize: string | number }) => {
  return (
    <i style={{ fontSize }} className={`${styles.icon} bi bi-x-circle `}></i>
  );
};

export const XIconFill = ({ fontSize }: { fontSize: string | number }) => {
  return (
    <i
      style={{ fontSize }}
      className={`${styles.icon} bi bi-x-circle-fill`}
    ></i>
  );
};
