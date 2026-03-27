import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import toast from "react-hot-toast";

const Login = () => {
  let api = import.meta.env.VITE_API_URL;
  let navigate = useNavigate();
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");

  let handleLogin = async () => {
    try {
      let res = await axios.post(`${api}/user/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Login Successful!");
      setemail("");
      setpassword("");
      navigate("/home");
    } catch (err) {
      toast.error(err.response.data.error || "Login failed ");
    }
  };
  return (
    <div className="container">
      <div className="total">
        <div className="email">
          <p>Email : </p>
          <input
            type="email"
            placeholder="eg. abc123@gmail.com"
            value={email}
            required
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="password">
          <p>Password : </p>
          <input
            type="password"
            placeholder="enter your password"
            value={password}
            required
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <p className="redirect">
          Don't have an account ?{" "}
          <Link to="/signup" className="link">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
