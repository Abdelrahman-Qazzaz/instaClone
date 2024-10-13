import { useState } from "react";
import styles from "./PasswordInput.module.css";
import { Button } from "react-bootstrap";
export const PasswordInput = ({
  password,
  handleChange,
}: {
  password: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.passwordInputContainer}>
      <input
        name="password"
        type={isVisible ? "text" : "password"}
        value={password}
        onChange={handleChange}
        placeholder="Password"
      />
      <Button
        type="button"
        onClick={toggleVisibility}
        className={`${styles.toggleButton} toggle-button bg-transparent border-0 text-dark fw-bold`}
      >
        {isVisible ? "Hide" : "Show"}
      </Button>
    </div>
  );
};
