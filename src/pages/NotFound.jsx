import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>NotFound</div>;
}

export default NotFound;
