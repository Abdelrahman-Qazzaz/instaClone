import { useState } from "react";
import "./PasswordInput.css";
export const PasswordInput = ({
  password,
  setPassword,
}: {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="password-input-container">
      <input
        type={isVisible ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="toggle-button"
      >
        {isVisible ? "Hide" : "Show"}
      </button>
    </div>
  );
};
