import React, { useState } from "react";
import axios from "axios";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  let navigate = useNavigate();
  let api = import.meta.env.VITE_API_URL;

  let [name, setname] = useState("");
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");

  let handleSignUp = async () => {
    try {
      let res = await axios.post(`${api}/user/signup`, {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Sign up successful !");
      setemail("");
      setname("");
      setpassword("");
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container">
      <div className="total">
        <div className="name">
          <p>Name : </p>
          <input
            type="text"
            placeholder="enter your name"
            value={name}
            required
            onChange={(e) => setname(e.target.value)}
          />
        </div>
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
        <button onClick={handleSignUp}>Signup</button>
      </div>
    </div>
  );
};

export default Signup;
