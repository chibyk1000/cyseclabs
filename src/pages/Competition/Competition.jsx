import React from "react";
import Navbar from "../../components/Navbar";
import "./Competition.css";

function Competition() {
  return (
    <>
      <Navbar />
      <main>
        <div className="first-section">
          <div className="hero-header">
            <h2>
              Choose Your <span style={{ color: "#2bf7bde3" }}>Weapon</span>
            </h2>
          </div>
        </div>
      </main>

      <div className="compete-body">
        <div className="compete-items">
          <div className="img">
            <div className="image main-img1"></div>
          </div>
          <div className="body">
            <h3>
              Hack The <span style={{ color: "#2bf7bde3" }}>Planet</span>
            </h3>
            <p>Hack as much as you can</p>
            <button style={{ backgroundColor: "#f8c049", color: "#222" }}>
              Enter Competition
            </button>
          </div>
        </div>
        <div className="compete-items">
          <div className="img" style={{ backgroundColor: "#f9d348" }}>
            <div className="image main-img2"></div>
          </div>
          <div className="body">
            <h3>
              CYSEC CTF <span style={{ color: "#F8C049" }}>2023</span>
            </h3>
            <p>
              The biggest cyber security hacking event & competition for
              undergraduates in Nigeria.
            </p>
            <button>Enter Competition</button>
          </div>
        </div>
        <div className="compete-items">
          <div className="img">
            <div className="image main-img3"></div>
          </div>
          <div className="body">
            <h3>
              Attack The <span style={{ color: "#2bf7bde3" }}>Attacker</span>
            </h3>
            <p>
              Attack The Attacker (ATA) is an attack/defense compeition style
              where you can actively hack a machine and defend it at the same
              time.
            </p>
            <button style={{ backgroundColor: "#f8c049", color: "#222" }}>
              Enter Competition
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Competition;
