import React from "react";

function Leaderboard() {
  return (
    <div className="box">
      <div className="dashboard-head">
        <h5>Leaderboard</h5>
      </div>
      <div className="recent-labs">
        <div className="table">
          <div className="head-row">
            <h5>Top Leaders</h5>
            <h5>Ratings</h5>
          </div>
          <div className="content-row">
            <div className="name-row">
              <p>Ehiedu Joy</p>
              <span>3120</span>
            </div>
            <div className="name-row">
              <p>Oghogho</p>
              <span>2780</span>
            </div>
            <div className="name-row">
              <p>Michael Osas</p>
              <span>2560</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
