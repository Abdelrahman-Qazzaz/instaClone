import { useState, FormEvent } from "react";
import "./LoginForm.css";
import { Button } from "react-bootstrap";
import { PasswordInput } from "../../../../components/Password Input/PasswordInput";
import api from "../../../../api/api";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    api.auth.login;
  };

  return (
    <div className="login-form-container">
      <h1 className="instaCloneTextLogo">InstaClone</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PasswordInput password={password} setPassword={setPassword} />
        <Button type="submit" className="login-button">
          Log In
        </Button>
      </form>
      <div className="divider">
        <span>OR</span>
      </div>
      <Button className="fb-login" type="button">
        Log in with Facebook
      </Button>
      <p className="signup-prompt">Don't have an account? Sign up</p>
    </div>
  );
};
