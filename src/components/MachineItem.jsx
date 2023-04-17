import React, { useRef, useState } from "react";

function MachineItem({ faq }) {
  const [clicked, setClicked] = useState(false);
  const contentEl = useRef();

  const { question, id } = faq;

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };
  return (
    <li className={`accordion_item ${clicked ? "active" : ""}`}>
      <button className="question-title" onClick={handleToggle}>
        Task {id}&nbsp;&nbsp;&nbsp;{question}
        <span className="control">{clicked ? <>△</> : <>▽</>} </span>
      </button>

      <div
        ref={contentEl}
        className="answer_wrapper"
        style={
          clicked
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="">
          <div className="">
            <div className="machine-text"></div>
          </div>

          <div className="room-questions">
            <div>Answer the questions below to continue to the next task</div>
          </div>

          <div className="room-input">
            <div className="room-input-questions">
              <textarea name="story" placeholder="Type your answer"></textarea>
            </div>
            <div className="room-answer">
              <button type="button" className="btn hvr-sweep-to-right">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default MachineItem;
