import { useState, FormEvent } from "react";
import "./LoginForm.css";
import { Button } from "react-bootstrap";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Add your login logic here
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
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
      <p className="signup-prompt">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};
