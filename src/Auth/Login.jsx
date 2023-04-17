import React, { useContext, useRef } from "react";
import dashboardImg from "../assets/img/newdashboardcrop.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/cysecnewlogo.png";
import "./auth.css";
import GlobalContext from "../context/GlobalContext";
import { Rolling } from "../components/Spinner";

function Login() {
  const usernameRef = useRef("");
  const passRef = useRef("");
  const navigate = useNavigate();
  const { isLoading, loginUser, user } = useContext(GlobalContext);


    if (user.length > 0) {
      navigate("/dashboard/home");
    }
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passRef.current.value,
    };
    loginUser(data);
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
              Sign <span style={{ color: "#0cbc8b" }}>In</span>
            </h2>
            <div className="wrapper-box">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    placeholder="Enter your username"
                    type="text"
                    required
                    ref={usernameRef}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    placeholder="Enter your password"
                    required
                    type="password"
                    ref={passRef}
                  />
                </div>
                <div className="agreement">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <button className="btn btn-e">
                  {isLoading ? <Rolling /> : "SIGN IN"}
                </button>
              </form>

              <div className="reset">
                <p>
                  Forget password?{" "}
                  <Link to="/forgot">
                    <span style={{ color: "#0cbc8b" }}>&nbsp; Reset</span>
                  </Link>
                </p>
                <p>
                  Sign Up
                  <Link to="/register">
                    {" "}
                    <span style={{ color: "#0cbc8b" }}>&nbsp; Here!</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-item-b">
          <div className="bg-img">
            <div className="textBox">
              <h3>Welcome Back</h3>
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

export default Login;
