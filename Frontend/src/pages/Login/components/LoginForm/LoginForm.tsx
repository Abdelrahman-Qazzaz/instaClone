import { useState, FormEvent } from "react";
import styles from "./LoginForm.module.css";
import { Button } from "react-bootstrap";
import { PasswordInput } from "../../../../components/Password Input/PasswordInput";
import { api } from "../../../../api/api";
import { Link } from "react-router-dom";
import { InstaCloneTextLogo } from "@/components/InstaCloneTextLogo/InstaCloneTextLogo";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await api.auth.login(formData);
  };

  return (
    <div className={styles.loginFormContainer}>
      <div className="mb-3">
        <InstaCloneTextLogo />
      </div>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <PasswordInput
          password={formData.password}
          handleChange={handleChange}
        />
        <Button type="submit" className={styles.loginButton}>
          Log In
        </Button>
      </form>
      <div className={styles.divider}>
        <span>OR</span>
      </div>

      <p className={styles.signupPrompt}>
        Don't have an account? <Link to={"/signup"}>Sign up</Link>
      </p>
    </div>
  );
};
