import React, { useContext, useRef } from "react";
import dashboardImg from "../assets/img/newdashboardcrop.png";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/cysecnewlogo.png";
import "./auth.css";
import { Rolling } from "../components/Spinner";
import GlobalContext from "../context/GlobalContext";

function Verify() {
  const { isLoading, resend, registerUser, verifyUser } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const tokenRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { token: tokenRef.current.value };
    verifyUser(data);
  };

  return (
    <>
      <div className="container">
        <div className="container-item-a">
          <div className="logo">
            <img src={logo} alt="logo" onClick={() => navigate("/")} />
          </div>
          <div className="wrapper">
            <h2>
              Verify Your <span style={{ color: "#0cbc8b" }}>Account</span>
            </h2>
            <div className="wrapper-box">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstname">Token Key</label>
                  <input
                    placeholder="Enter your Token"
                    type="text"
                    required
                    name="firstname"
                    ref={tokenRef}
                  />
                </div>
                <button className="btn btn-e">
                  {isLoading ? <Rolling /> : "VERIFY"}
                </button>
                {resend && (
                  <label>
                    Token expired{" "}
                    <span
                      onClick={registerUser}
                      style={{ color: "#0cbc8b", cursor: "pointer" }}
                    >
                      Resend
                    </span>
                  </label>
                )}
              </form>
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

export default Verify;
