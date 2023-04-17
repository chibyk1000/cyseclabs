import React, { useContext, useRef } from "react";
import user from "../assets/img/image.me.jpg";
import logo from "../assets/img/cysecnewlogo.png";
import { NavLink, useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

function DashNavbar({ handleTab }) {
  const { search } = useContext(GlobalContext);
  const searchRef = useRef("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      query: searchRef.current.value,
    };
    search(data);
    navigate("/dashboard/search");
  };    

  return (
    <header>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <NavLink
          to="/dashboard/downloadvpn"
          end
          onClick={() => handleTab("tab4")}
        >
          <button className="vpn">Download VPN</button>
        </NavLink>

        <form onSubmit={onSubmit}>
          <div className="search">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.924 11.795L17.1831 16.0542C17.3328 16.204 17.4169 16.4071 17.4168 16.6189C17.4168 16.8307 17.3326 17.0338 17.1827 17.1835C17.0329 17.3332 16.8298 17.4172 16.618 17.4172C16.4062 17.4171 16.2031 17.3329 16.0534 17.1831L11.7943 12.9239C10.521 13.9101 8.91995 14.3742 7.3167 14.2217C5.71346 14.0693 4.22849 13.3119 3.1639 12.1034C2.09931 10.895 1.53505 9.32644 1.58593 7.71677C1.6368 6.1071 2.29898 4.57727 3.43776 3.43849C4.57653 2.29971 6.10637 1.63753 7.71604 1.58666C9.3257 1.53579 10.8943 2.10004 12.1027 3.16463C13.3111 4.22923 14.0686 5.71419 14.221 7.31744C14.3734 8.92068 13.9093 10.5218 12.9232 11.795H12.924ZM7.91669 12.6666C9.17646 12.6666 10.3846 12.1662 11.2754 11.2754C12.1662 10.3846 12.6667 9.17641 12.6667 7.91663C12.6667 6.65685 12.1662 5.44867 11.2754 4.55787C10.3846 3.66707 9.17646 3.16663 7.91669 3.16663C6.65691 3.16663 5.44873 3.66707 4.55793 4.55787C3.66713 5.44867 3.16669 6.65685 3.16669 7.91663C3.16669 9.17641 3.66713 10.3846 4.55793 11.2754C5.44873 12.1662 6.65691 12.6666 7.91669 12.6666Z"
                fill="#ddd"
              />
            </svg>
            <input type="text" placeholder="Search" ref={searchRef} />
          </div>
        </form>
        <div className="user">
          <img src={user} alt="user" />
          <h5>Michael</h5>
        </div>
        <button className="menu" id="menu" aria-label="Main Menu">
          <svg width="50" height="100" viewBox="0 0 100 100">
            <path
              className="line line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path className="line line2" d="M 20,50 H 80" />
            <path
              className="line line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default DashNavbar;
