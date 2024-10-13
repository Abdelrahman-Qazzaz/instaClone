import { FormEvent, useState } from "react";

import styles from "./SignupForm.module.css";
import { PasswordInput } from "../../../components/Password Input/PasswordInput";
import { Link } from "react-router-dom";
import { api } from "../../../api/api";

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await api.auth.signup(formData);
  };
  return (
    <div className={styles.signupFormContainer}>
      <h1 className={styles.instaCloneTextLogo}>InstaClone</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <PasswordInput
          password={formData.password}
          handleChange={handleChange}
        />
        <button type="submit" className="mt-4">
          Sign Up
        </button>
      </form>
      <p className={styles.loginPrompt}>
        Already have an account? <Link to={"/login"}>Log in</Link>
      </p>
    </div>
  );
};
