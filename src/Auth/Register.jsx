import React, { useContext, useEffect, useRef, useState } from "react";
import dashboardImg from "../assets/img/newdashboardcrop.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/cysecnewlogo.png";
import "./auth.css";
import { Rolling } from "../components/Spinner";
import GlobalContext from "../context/GlobalContext";

function Register() {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passRef = useRef("");
  const usernameRef = useRef("");
  const firstnameRef = useRef("");
  const lastnameRef = useRef("");
  const [resend, setResend] = useState(false);
  const [loading, setLoading] = useState(false);

  const { registerUser, user } = useContext(GlobalContext);

  if (user.length > 0) {
    navigate("/dashboard/home");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResend(true);
    setLoading(true);
    const data = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    registerUser(data);
  };
  return (
    <>
      <div className="container">
        <div className="container-item-a">
          <div className="logo">
            <img src={logo} alt="" onClick={() => navigate("/")} />
          </div>
          <div className="wrapper">
            <h2>
              Create An <span style={{ color: "#0cbc8b" }}>Account</span>
            </h2>
            <div className="wrapper-box">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    placeholder="Enter your Firstname"
                    type="text"
                    required
                    id="firstname"
                    ref={firstnameRef}
                    // id="username"
                    // value={username}
                    // onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    placeholder="Enter your Lastname"
                    type="text"
                    required
                    id="lastname"
                    ref={lastnameRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    placeholder="Enter your Email"
                    type="email"
                    required
                    id="email"
                    ref={emailRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    placeholder="Enter your password"
                    required
                    type="password"
                    id="password"
                    ref={passRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    placeholder="Enter your username"
                    required
                    type="text"
                    name="username"
                    ref={usernameRef}
                  />
                </div>
                <div className="agreement">
                  <input type="checkbox" id="agree" />
                  <label htmlFor="agree">I accept the Terms of Service</label>
                </div>

                <button className="btn btn-e">
                  {loading ? <Rolling /> : "SIGN UP"}
                </button>
                {resend && (
                  <label>
                    Didn't get receive a token?{" "}
                    <span
                      onClick={handleSubmit}
                      style={{ color: "#0cbc8b", cursor: "pointer" }}
                    >
                      Resend
                    </span>
                  </label>
                )}
              </form>

              <div className="reset">
                <p>
                  Already have an account?{" "}
                  <Link to="/login">
                    <span style={{ color: "#0cbc8b" }}>&nbsp; Sign In</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-item-b">
          <div className="bg-img">
            <div className="textBox">
              <h3>Start Your Journey With Us</h3>
              <p>
                Discover, learn and create real world hacking solutions. Your
                road map to becoming a cyber security engineer
              </p>
            </div>
            <img src={dashboardImg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
