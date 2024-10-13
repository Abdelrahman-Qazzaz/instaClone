import styles from "./PFPIcon.module.css";

export const PFPIcon = ({
  width,
  url,
}: {
  width: number | string;
  url: string;
}) => {
  return (
    <div
      className={styles.container}
      style={{
        width,
        height: width,
        border: `calc(${width} / 30) solid red`,
      }}
    >
      <div className={styles.profilePicture}>
        <img src={url} alt="Profile" />
      </div>
    </div>
  );
};
