import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import GlobalContext from "../context/GlobalContext";
//import parse from "html-react-parser";
//import Machine from "../../src/components/Machine";

function CreateMaterials() {
  const { addMachine, machineData, machineEdit, updateMachine } =
    useContext(GlobalContext);
  const [contain, setContain] = useState("");
  const [taskData, setTaskData] = useState(machineData);

  //====================================================
  //====================================================

  useEffect(() => {
    if (machineEdit.edit === true) {
      setTaskData({
        name: machineEdit.machine.name,
        tag: machineEdit.machine.tag,
        desc: machineEdit.machine.desc,
        category: machineEdit.machine.category,
        team: machineEdit.machine.team,
        image: machineEdit.machine.image,
      });
    }
  }, []);

  const { title, task, ans } = taskData;

  const handleChange = (e) => {
    setTaskData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const answer = ans?.toLowerCase();

  const onSubmit = (e) => {
    e.preventDefault();
    const taskDataCopy = {
      ...taskData,
      answer,
      contain,
    };
    delete taskDataCopy.answer;
    addMachine(taskDataCopy);
    toast.success("Machine Added Successfully");

    // To Edit the Machine
    if (machineEdit.edit === true) {
      updateMachine(machineEdit.machine.id, taskDataCopy);
    }
    //=====================
    setTaskData({
      title: "",
      task: "",
      ans: "",
    });
    setContain("");
    console.log(taskDataCopy);
  };

  return (
    <div className="box create-labs">
      <h5>Create Material</h5>
      <form onSubmit={onSubmit}>
        <div className="mat1">
          <div className="mat-box">
            <label htmlFor="name">Title</label>
            <input
              type="text"
              id="title"
              onChange={handleChange}
              value={title || ""}
              required
              placeholder="Enter Lab Name"
            />
          </div>
          <div className="mat-box" style={{ color: "#000 !important" }}>
            <label htmlFor="desc">Content</label>
            <ReactQuill
              theme="snow"
              value={contain || ""}
              onChange={setContain}
              required
            />
          </div>
          &nbsp;
          <div className="mat-box">
            <label htmlFor="task">Task</label>
            <input
              type="text"
              id="task"
              value={task || ""}
              required
              onChange={handleChange}
              placeholder="Enter a task "
            />
          </div>
          <div className="mat-box">
            <label htmlFor="answer">Answer</label>
            <input
              type="text"
              id="ans"
              value={ans || ""}
              required
              onChange={handleChange}
              placeholder="Write answer"
            />
          </div>
        </div>
        <button type="submit" className="create">
          Create
        </button>
      </form>
      {/* <div className="display-labs">
        <Machine />

        <div>{parse(`${contain}`)}</div>
      </div> */}
    </div>
  );
}

export default CreateMaterials;
