import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import "./index.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiFailure, setApiFailure] = useState(false);

  const submitRegisterForm = async (event) => {
    event.preventDefault();
    setUsername("");
    setEmail("");
    setPassword("");

    try {
      const response = await axios.post("http://localhost:4000/register", {
        username,
        email,
        password,
      });
      setApiSuccess(true);
      setSuccessMsg(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg(error.response.data);
        setApiFailure(true);
      } else {
        setErrorMsg(error.message);
        setApiFailure(true);
      }
    }
  };

  const history = useHistory();

  const retryButton = () => {
    history.replace("/login");
    window.location.reload();
  };

  const loginButton = () => {
    history.replace("/login");
  };

  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-form-container">
      <img
        src="https://res.cloudinary.com/dzscdp79g/image/upload/v1692984003/user_1177568_otbirt.png"
        className="login-website-logo-mobile-image"
        alt="Website Logo"
      />
      <form className="form-container" onSubmit={submitRegisterForm}>
        <img
          src="https://res.cloudinary.com/dzscdp79g/image/upload/v1692984003/user_1177568_otbirt.png"
          className="login-website-logo-desktop-image"
          alt="Website Logo"
        />
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="username-input-field"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="email">
            EMAIL
          </label>
          <input
            type="email"
            id="email"
            className="password-input-field"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Email"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
        {apiFailure && (
          <>
            <p className="error-message">*{errorMsg}</p>
            <button
              type="button"
              className="register-login-button"
              onClick={retryButton}
            >
              Login
            </button>
          </>
        )}
        {apiSuccess && (
          <>
            <p className="success-message">*{successMsg}</p>
            <button
              type="button"
              className="register-login-button"
              onClick={loginButton}
            >
              Login
            </button>
          </>
        )}
      </form>
    </div>
  );
};
export default Register;
