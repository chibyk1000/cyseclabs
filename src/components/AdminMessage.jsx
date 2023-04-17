import React from "react";
import admin from "../assets/img/Mr Victor.jpg";
import twitter from "../assets/img/twitter.png";
import instagram from "../assets/img/instagram.png";
import facebook from "../assets/img/facebook.png";
import linkedin from "../assets/img/linkedin.png";

function AdminMessage() {
  return (
    <div className="box right-sidebar-down">
      <div className="notification">
        <div className="head">
          <h5>Notification</h5>
          <div className="bell">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19C15 19.7957 14.6839 20.5587 14.1213 21.1213C13.5587 21.6839 12.7956 22 12 22C11.2043 22 10.4413 21.6839 9.87867 21.1213C9.31606 20.5587 8.99999 19.7957 8.99999 19M12.721 5.00302L11.255 5.00002C7.91099 4.99202 5.00799 7.70902 4.98499 11V14.79C4.98499 15.58 4.88499 16.351 4.45399 17.008L4.16699 17.446C3.72999 18.11 4.19999 19 4.98499 19H19.015C19.8 19 20.269 18.11 19.833 17.446L19.546 17.008C19.116 16.351 19.015 15.579 19.015 14.789V11.001C18.975 7.70902 16.065 5.01102 12.721 5.00302V5.00302Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 2C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4V5H10V4C10 3.46957 10.2107 2.96086 10.5858 2.58579C10.9609 2.21071 11.4696 2 12 2Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="message">
          <div className="message-head">
            <img src={admin} alt="admin" />
            <h5 className="message-head-name">Cysec Admin</h5>
          </div>
          <div className="message-body">
            <p>
              Dear hacker, welcome to cysec hacking labs. Reach out to us on our
              social handles
            </p>
            <div className="social-icons">
              <a href="https://facebook.com/cysecng">
                <img src={facebook} alt="facebook" />
              </a>
              <a href="https://instagram.com/cysecng">
                <img src={instagram} alt="instagram" />
              </a>
              <a href="https://ng.linkedin.com/company/cysec-ng">
                <img src={linkedin} alt="linkedin" />
              </a>
              <a href="https://twitter.com/cysecng">
                <img src={twitter} alt="twitter" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMessage;
