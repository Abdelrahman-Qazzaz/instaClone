import styles from "./ToggleButton.module.css";

export const ToggleButton = ({ text }: { text: string }) => {
  return (
    <div>
      <div className={styles.text}> {text}</div>
      <button></button>
    </div>
  );
};
