import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [apiFailure, setApiFailure] = useState(false);

  const submitLoginForm = async (event) => {
    event.preventDefault();
    setUsername("");
    setPassword("");

    try {
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });
      onSubmitSuccess(response.data.jwtToken);
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

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 90,
      path: "/",
    });
    history.replace("/");
    window.location.reload();
  };

  const registerButton = () => {
    history.replace("/register");
    window.location.reload();
  };

  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-form-container">
      <img
        src="https://res.cloudinary.com/dzscdp79g/image/upload/v1692984021/profile_4945750_gbjj8d.png"
        className="login-website-logo-mobile-image"
        alt="website logo"
      />
      <form className="form-container" onSubmit={submitLoginForm}>
        <img
          src="https://res.cloudinary.com/dzscdp79g/image/upload/v1692984021/profile_4945750_gbjj8d.png"
          className="login-website-logo-desktop-image"
          alt="website logo"
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
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            placeholder="Username"
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
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {apiFailure && (
          <>
            <p className="error-message">*{errorMsg}</p>
            <button
              type="button"
              className="register-login-button"
              onClick={registerButton}
            >
              Register
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
