import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

function DashboardNotification() {
 
const {notification, closeNotification} = useContext(GlobalContext)

  return (
    <div className="notification-box">
      {notification && (
        <div className="notification_bar">
          <span onClick={closeNotification} className="notification-closebutton">x</span>
          We are still upgrading our system please bear with us.
        </div>
      )}
    </div>
  );
}

export default DashboardNotification;
