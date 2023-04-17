import React from "react";
import { useParams } from "react-router-dom";

function Room() {
  const params = useParams();
  return <h1>Room {params.id}</h1>;
}

export default Room;
