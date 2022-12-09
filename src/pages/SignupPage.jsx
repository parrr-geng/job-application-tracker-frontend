import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { Button } from "react-bootstrap";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    authService
      .signup(requestBody)
      .then((response) => {   
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage shadow">
      <div className="header">
        <h2 className="fw-bold">Sign Up</h2>

        <form onSubmit={handleSignupSubmit} className="form">

          <label><small>Name</small></label>
          <input type="text" name="name" value={name} onChange={handleName} />
         
          <label><small>Email</small></label>
          <input type="email" name="email" value={email} onChange={handleEmail} />

          <label><small>Password</small></label>
          <input type="password" name="password" value={password} onChange={handlePassword} />
          <br />
    
          <Button variant="warning" type="submit">Continue</Button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <small className="text-secondary mt-4">Already have account?</small>
        <Link to={"/login"}>Login</Link>
      </div>

    </div>
  );
}

export default SignupPage;
