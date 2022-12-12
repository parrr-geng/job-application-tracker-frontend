import "./LoginPage.css";
import { Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage shadow">
      <Link to="/" className="Logo">
        <h3 className="ms-4 p-3 fw-bold">J..</h3>
      </Link>

      <div className="header">
          <h2 className="fw-bold">Log in</h2>

          <form onSubmit={handleLoginSubmit} className="form">
            <label><small>Email</small></label>
            <input type="email" name="email" value={email} onChange={handleEmail} />

            <label><small>Password</small></label>
            <input type="password" name="password" value={password} onChange={handlePassword} />
            <br />

            <Button variant="warning" type="submit">Login</Button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <small className="text-secondary mt-4">Don't have an account yet?</small>
          <Link to={"/signup"}> Sign Up </Link>
      </div>
    </div>
  );
}

export default LoginPage;
