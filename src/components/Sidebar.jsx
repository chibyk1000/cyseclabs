import React, { useContext } from "react";
import userImg from "../assets/img/image.me.jpg";
import { ImUpload3 } from "react-icons/im";
import { FaListAlt } from "react-icons/fa";
import { HiFolderAdd } from "react-icons/hi";
import logout from "../assets/img/heroicons-outline_logout.svg";
import { IoIosListBox } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";
import { GrTasks } from "react-icons/gr";
import { MdPlaylistAdd } from "react-icons/md";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { AiFillFolderAdd } from "react-icons/ai";
function Sidebar({ handleTab }) {
  const { adminUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const resp = await axios.get("/users/logout");
      console.log(resp);
      if (resp.status === 200) {
        sessionStorage.clear();
        navigate("/login");
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="flex-one" id="dashboardMenu">
        <div className="box left-sidebar">
          <h4>
            CYSEC <span style={{ color: "#0cbc8b" }}>HACKING</span> LABS
          </h4>

          <div className="user">
            <img src={userImg} alt="user" />
            <h5>Michael Osas</h5>

            <button className="vpn-mobile">VPN</button>
          </div>
          <div className="sidemenu">
            <div className="search-m">
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
              <input type="text" placeholder="Search" />
            </div>

            <NavLink
              end
              to="/dashboard/home"
              className={({ isActive }) =>
                isActive ? "sidemenu-item active" : "sidemenu-item"
              }
              onClick={() => handleTab("tab1")}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 22.0001H19C19.5304 22.0001 20.0391 21.7893 20.4142 21.4143C20.7893 21.0392 21 20.5305 21 20.0001V11.0001C21.0008 10.8685 20.9755 10.738 20.9258 10.6162C20.876 10.4943 20.8027 10.3835 20.71 10.2901L12.71 2.29006C12.5226 2.10381 12.2692 1.99927 12.005 1.99927C11.7408 1.99927 11.4874 2.10381 11.3 2.29006L3.3 10.2901C3.20551 10.3827 3.13034 10.4931 3.07885 10.615C3.02735 10.7369 3.00055 10.8678 3 11.0001V20.0001C3 20.5305 3.21071 21.0392 3.58579 21.4143C3.96086 21.7893 4.46957 22.0001 5 22.0001ZM10 20.0001V15.0001H14V20.0001H10ZM5 11.4101L12 4.41006L19 11.4101V20.0001H16V15.0001C16 14.4696 15.7893 13.9609 15.4142 13.5858C15.0391 13.2108 14.5304 13.0001 14 13.0001H10C9.46957 13.0001 8.96086 13.2108 8.58579 13.5858C8.21071 13.9609 8 14.4696 8 15.0001V20.0001H5V11.4101Z" />
              </svg>
              <h5>Dashboard</h5>
            </NavLink>
            <NavLink
              end
              to="/dashboard/leaderboard"
              className={({ isActive }) =>
                isActive ? "sidemenu-item active" : "sidemenu-item"
              }
              onClick={() => handleTab("leadersboard")}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 11V19H8V11H4ZM10 5V19H14V5H10ZM16 13V19H20V13H16ZM20 21H4C3.45 21 2.97933 20.8043 2.588 20.413C2.196 20.021 2 19.55 2 19V11C2 10.45 2.196 9.979 2.588 9.587C2.97933 9.19567 3.45 9 4 9H8V5C8 4.45 8.196 3.979 8.588 3.587C8.97933 3.19567 9.45 3 10 3H14C14.55 3 15.021 3.19567 15.413 3.587C15.8043 3.979 16 4.45 16 5V11H20C20.55 11 21.021 11.1957 21.413 11.587C21.8043 11.979 22 12.45 22 13V19C22 19.55 21.8043 20.021 21.413 20.413C21.021 20.8043 20.55 21 20 21Z" />
              </svg>

              <h5>Leadersboard</h5>
            </NavLink>
            <NavLink
              end
              to="/dashboard/labs"
              className={({ isActive }) =>
                isActive ? "sidemenu-item active" : "sidemenu-item"
              }
              // onClick={() => handleTab("")}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.995 11C13.995 11.3975 13.8766 11.7859 13.6548 12.1158C13.4331 12.4456 13.1181 12.702 12.75 12.852V15.25C12.75 15.4489 12.671 15.6397 12.5303 15.7803C12.3897 15.921 12.1989 16 12 16C11.8011 16 11.6103 15.921 11.4697 15.7803C11.329 15.6397 11.25 15.4489 11.25 15.25V12.856C10.913 12.7207 10.6192 12.4963 10.4001 12.2067C10.181 11.9172 10.0449 11.5734 10.0063 11.2124C9.96775 10.8513 10.0282 10.4866 10.1812 10.1573C10.3342 9.82794 10.574 9.5465 10.8748 9.34311C11.1756 9.13973 11.5261 9.02207 11.8887 9.00276C12.2513 8.98346 12.6123 9.06323 12.933 9.23353C13.2537 9.40383 13.522 9.65822 13.7091 9.96942C13.8962 10.2806 13.995 10.6369 13.995 11ZM3.75 5C3.55109 5 3.36032 5.07902 3.21967 5.21967C3.07902 5.36032 3 5.55109 3 5.75V11C3 16.001 5.958 19.676 11.725 21.948C11.9017 22.0176 12.0983 22.0176 12.275 21.948C18.042 19.676 21 16 21 11V5.75C21 5.55109 20.921 5.36032 20.7803 5.21967C20.6397 5.07902 20.4489 5 20.25 5C17.587 5 14.992 4.057 12.45 2.15C12.3202 2.05263 12.1623 2 12 2C11.8377 2 11.6798 2.05263 11.55 2.15C9.008 4.057 6.413 5 3.75 5ZM4.5 11V6.478C7.077 6.326 9.58 5.388 12 3.678C14.42 5.388 16.923 6.326 19.5 6.478V11C19.5 15.256 17.047 18.379 12 20.442C6.953 18.379 4.5 15.256 4.5 11Z" />
              </svg>
              <h5>Labs</h5>
            </NavLink>
          </div>
          <Divider sx={{ backgroundColor: "white" }} />
          {adminUser && (
            <>
              <Accordion disableGutters sx={{ background: "none" }}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  expandIcon={<ExpandMore sx={{ color: "white" }} />}
                  className=" sidemenu-item"
                >
                  <div className="sidemenu-summary">
                    <HiFolderAdd
                      style={{ color: "#0cbc8a", fontSize: "23px" }}
                    />
                    <h5>Manage Labs</h5>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <NavLink
                    end
                    to="/dashboard/all-labs"
                    className={({ isActive }) =>
                      isActive ? "sidemenu-item active" : "sidemenu-item"
                    }
                    onClick={() => handleTab("tab6")}
                  >
                    <FaListAlt style={{ color: "#0cbc8a", fontSize: "23px" }} />
                    <h5>All Labs</h5>
                  </NavLink>
                  <NavLink
                    end
                    to="/dashboard/createlabs"
                    className={({ isActive }) =>
                      isActive ? "sidemenu-item active" : "sidemenu-item"
                    }
                    onClick={() => handleTab("tab6")}
                  >
                    <AiFillFolderAdd
                      style={{ color: "#0cbc8a", fontSize: "23px" }}
                    />
                    <h5>New Labs</h5>
                  </NavLink>
                </AccordionDetails>
              </Accordion>
              <Accordion disableGutters sx={{ background: "none" }}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  expandIcon={<ExpandMore sx={{ color: "white" }} />}
                  className="sidemenu-item"
                >
                  <div className="sidemenu-summary">
                    <ImUpload3 style={{ color: "#0cbc8a", fontSize: "20px" }} />
                    <h5>Manage Materials</h5>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <NavLink
                    end
                    to="/dashboard/creatematerials"
                    className={({ isActive }) =>
                      isActive ? "sidemenu-item active" : "sidemenu-item"
                    }
                    onClick={() => handleTab("tab7")}
                  >
                    <MdPlaylistAdd
                      style={{ color: "#0cbc8a", fontSize: "20px" }}
                    />
                    <h5>New Materials</h5>
                  </NavLink>
                  <NavLink
                    end
                    to="/dashboard/creatematerials"
                    className={({ isActive }) =>
                      isActive ? "sidemenu-item active" : "sidemenu-item"
                    }
                    onClick={() => handleTab("tab7")}
                  >
                    <IoIosListBox
                      style={{ color: "#0cbc8a", fontSize: "20px" }}
                    />
                    <h5>All Materials</h5>
                  </NavLink>
                </AccordionDetails>
              </Accordion>
              <Accordion disableGutters sx={{ background: "none" }}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  expandIcon={<ExpandMore sx={{ color: "white" }} />}
                  className="sidemenu-item"
                >
                  <div className="sidemenu-summary">
                    <BiTask style={{ color: "#0cbc8a", fontSize: "20px" }} />
                    <h5>Manage Task</h5>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <NavLink
                    end
                    to="/dashboard/createtasks"
                    className={({ isActive }) =>
                      isActive ? "sidemenu-item active" : "sidemenu-item"
                    }
                    onClick={() => handleTab("tab7")}
                  >
                    <MdPlaylistAdd
                      style={{ color: "#0cbc8a", fontSize: "20px" }}
                    />
                    <h5>New Tasks</h5>
                  </NavLink>
                  <NavLink
                    end
                    to="/dashboard/units"
                    className={({ isActive }) =>
                      isActive ? "sidemenu-item active" : "sidemenu-item"
                    }
                    onClick={() => handleTab("tab7")}
                  >
                    <GrTasks style={{ color: "#0cbc8a", fontSize: "20px" }} />
                    <h5>All Tasks</h5>
                  </NavLink>
                </AccordionDetails>
              </Accordion>
            </>
          )}

          <NavLink
            to="/dashboard/settings"
            end
            className="settings"
            onClick={() => handleTab("tab5")}
          >
            <svg
              width="20"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2.269C13 1.568 12.432 1 11.731 1H10.27C9.568 1 9 1.568 9 2.269C9 2.847 8.604 3.343 8.065 3.555C7.98 3.589 7.895 3.625 7.812 3.661C7.281 3.891 6.65 3.821 6.24 3.412C6.00204 3.17421 5.6794 3.04064 5.343 3.04064C5.0066 3.04064 4.68396 3.17421 4.446 3.412L3.412 4.446C3.17421 4.68396 3.04064 5.0066 3.04064 5.343C3.04064 5.6794 3.17421 6.00204 3.412 6.24C3.822 6.65 3.892 7.28 3.66 7.812C3.62355 7.89572 3.58854 7.98007 3.555 8.065C3.343 8.604 2.847 9 2.269 9C1.568 9 1 9.568 1 10.269V11.731C1 12.432 1.568 13 2.269 13C2.847 13 3.343 13.396 3.555 13.935C3.589 14.02 3.625 14.105 3.66 14.188C3.891 14.719 3.821 15.35 3.412 15.76C3.17421 15.998 3.04064 16.3206 3.04064 16.657C3.04064 16.9934 3.17421 17.316 3.412 17.554L4.446 18.588C4.68396 18.8258 5.0066 18.9594 5.343 18.9594C5.6794 18.9594 6.00204 18.8258 6.24 18.588C6.65 18.178 7.28 18.108 7.812 18.339C7.895 18.376 7.98 18.411 8.065 18.445C8.604 18.657 9 19.153 9 19.731C9 20.432 9.568 21 10.269 21H11.731C12.432 21 13 20.432 13 19.731C13 19.153 13.396 18.657 13.935 18.444C14.02 18.411 14.105 18.376 14.188 18.34C14.719 18.108 15.35 18.179 15.759 18.588C15.8768 18.7059 16.0168 18.7994 16.1708 18.8632C16.3248 18.927 16.4898 18.9599 16.6565 18.9599C16.8232 18.9599 16.9882 18.927 17.1422 18.8632C17.2962 18.7994 17.4362 18.7059 17.554 18.588L18.588 17.554C18.8258 17.316 18.9594 16.9934 18.9594 16.657C18.9594 16.3206 18.8258 15.998 18.588 15.76C18.178 15.35 18.108 14.72 18.339 14.188C18.376 14.105 18.411 14.02 18.445 13.935C18.657 13.396 19.153 13 19.731 13C20.432 13 21 12.432 21 11.731V10.27C21 9.569 20.432 9.001 19.731 9.001C19.153 9.001 18.657 8.605 18.444 8.066C18.4105 7.98106 18.3755 7.89671 18.339 7.813C18.109 7.282 18.179 6.651 18.588 6.241C18.8258 6.00304 18.9594 5.6804 18.9594 5.344C18.9594 5.0076 18.8258 4.68496 18.588 4.447L17.554 3.413C17.316 3.17521 16.9934 3.04164 16.657 3.04164C16.3206 3.04164 15.998 3.17521 15.76 3.413C15.35 3.823 14.72 3.893 14.188 3.662C14.1043 3.62521 14.0199 3.58987 13.935 3.556C13.396 3.343 13 2.847 13 2.27V2.269Z"
                stroke="#415eff"
                strokeWidth="2"
              />
              <path
                d="M15 11C15 12.0609 14.5786 13.0783 13.8284 13.8284C13.0783 14.5786 12.0609 15 11 15C9.93913 15 8.92172 14.5786 8.17157 13.8284C7.42143 13.0783 7 12.0609 7 11C7 9.93913 7.42143 8.92172 8.17157 8.17157C8.92172 7.42143 9.93913 7 11 7C12.0609 7 13.0783 7.42143 13.8284 8.17157C14.5786 8.92172 15 9.93913 15 11V11Z"
                stroke="#415eff"
                strokeWidth="2"
              />
            </svg>
            <h5>Settings</h5>
          </NavLink>

          <button onClick={logoutUser} className="logout">
            <img src={logout} alt="Logout" />
            <p>Logout</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
