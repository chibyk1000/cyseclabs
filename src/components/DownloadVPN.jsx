import React from "react";
import vpnLock from "../assets/img/8._Computer_Lock-removebg-preview.png";

function DownloadVPN() {
  return (
    <div className="box" id="vpn">
      <div className="download-vpn">
        <img src={vpnLock} alt="icon" />
        <button>Download VPN file</button>
      </div>
    </div>
  );
}

export default DownloadVPN;
