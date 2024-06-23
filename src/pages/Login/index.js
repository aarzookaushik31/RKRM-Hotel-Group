import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";
import loginImage from "../../assets/loginImage.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formType, setFormType] = useState("login");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://52.66.101.51:3000/super-user/login",
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

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://52.66.101.51:3000/super-user/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        setFormType("login");
        setError("Registration successful. Please log in.");
      } else {
        setError("Failed to create user. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className={classes.loginForm}>
      <img src={loginImage} alt="" />
      {formType === "login" ? (
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
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => {
                setFormType("register");
                setError("");
              }}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Register here
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
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
          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setFormType("login");
                setError("");
              }}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Login here
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
