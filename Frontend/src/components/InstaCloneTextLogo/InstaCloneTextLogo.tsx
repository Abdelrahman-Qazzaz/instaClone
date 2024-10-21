import styles from "./instaCloneTextLogo.module.css";

export const InstaCloneTextLogo = ({ fontSize }: { fontSize?: string }) => {
  return (
    <h1 style={{ fontSize }} className={styles.instaCloneTextLogo}>
      InstaClone
    </h1>
  );
};
