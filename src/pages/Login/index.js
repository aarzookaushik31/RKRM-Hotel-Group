import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";
import loginImage from "../../assets/loginImage.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://43.204.15.248:3000/super-user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.data.defaultHotelId;
        console.log(token);
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className={classes.loginForm}>
      <img src={loginImage} alt="" />
      <form onSubmit={handleLogin}>
        <div className={classes.formField}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={classes.formField}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
