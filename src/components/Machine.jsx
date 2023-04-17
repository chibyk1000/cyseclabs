import React from "react";
import MachineItem from "./MachineItem";
import { faqs } from "../demoData";

function Machine() {
  return (
    <div>
      <ul className="box accordion">
        {faqs.map((faq, index) => (
          <MachineItem key={index} faq={faq} />
        ))}
      </ul>
    </div>
  );
}

export default Machine;
