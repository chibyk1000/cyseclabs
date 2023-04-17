//import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function User(props) {

  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      const resp = await axios.get("/users/user", {
        headers: {
          authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
        },
      });

//      const result = resp.data;
      if (resp.status === 201) {
        navigate();
      } else {
        //navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div checkUser={checkUser}>{props.children}</div>;
}

export default User;
