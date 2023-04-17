import React from "react";
//import { Link } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Lab from "./Lab";
import Spinner from "../shared/Spinner";

function Labs() {
  const { labsData, isLoading } = useContext(GlobalContext);

  console.log(labsData);
  
  if (!isLoading && (!labsData || labsData.length === 0)) {
    return <h3> No Labs Available</h3>;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="box">
      <div className="recent-labs">
        <div className="dashboard-head">
          <h5>Rooms Available</h5>
        </div>
        <div className="labsGrid">
          {labsData.map((labs) => (
            <Lab room={labs} key={labs.id} id={labs.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Labs;
