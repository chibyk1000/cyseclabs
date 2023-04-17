import React from "react";
import { Link } from "react-router-dom";

function Lab({ room }) {
  return (
    <div className="labsGrid-box">
      <h3 className="labsGrid-name">{room.name}</h3>
      <h5 className="labsGrid-category">{room.category}</h5>
      <Link to={`/dashboard/labs/${room.name}`} className="start">
        Start Machine &nbsp;▷
      </Link>

      <div className="labsGrid-tags">
        {/* {room.tag.map((tagName) => (
          <p>{tagName}</p>
        ))} */}
        <p>{room.tag}</p>
      </div>
    </div>
  );
}

export default Lab;
