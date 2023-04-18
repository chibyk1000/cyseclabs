import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";
function CreateUnits() {
  const { addMachine, machineData, machineEdit, updateMachine, labsData } =
    useContext(GlobalContext);

  const [description, setDescription] = useState("");
  const [inputList, setinputList] = useState([{ question: "", answer: "" }]);
  const [heading, setHeading] = useState("");
  const [labId, setLabId] = useState("");
  //====================================================
  //====================================================
  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([...inputList, { question: "", answer: "" }]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { heading, description, tasks: inputList };
      const resp = await axios.post(`/manage/add-unit-to-lab/${labId}`, data, {
        headers: {
          authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
        },
        withCredentials: true,
      });

      if (resp.status === 200) {
        toast.success("unit created");

        setDescription("");
        setHeading("");
        setLabId("");
        setinputList([{ question: "", answer: "" }]);
      } else toast.error(resp.response.data.message);
    } catch (error) {}
  };

  return (
    <div className="box create-labs">
      <h5>Create Material</h5>
      <form onSubmit={onSubmit}>
        <div className="mat1">
          <div className="mat-box form-box">
            <select
              name="lab name"
              // ref={categoryRef}
              onChange={(event) => setLabId(event.target.value)}
              required
            >
              <option>-- Lab name --</option>
              {labsData.map((lab) => {
                return (
                  <option key={lab.id} value={lab.id}>
                    {lab.id}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mat-box form-box">
            <label htmlFor="name">Title</label>
            <input
              type="text"
              id="title"
              onChange={(event) => setHeading(event.target.value)}
              value={heading || ""}
              required
              placeholder="Title"
            />
          </div>
          <div className="mat-box" style={{ color: "#000 !important" }}>
            <label htmlFor="desc">Content</label>
            <ReactQuill
              theme="snow"
              value={description || ""}
              onChange={setDescription}
              required
            />
          </div>
          &nbsp;
          {inputList.map((x, i) => {
            return (
              <>
                <div className="form-grid">
                  <div className="mat-box">
                    <label htmlFor="task">Task</label>
                    <input
                      type="text"
                      name="question"
                      value={x.question}
                      required
                      onChange={(e) => handleinputchange(e, i)}
                      placeholder="Enter a task "
                    />
                  </div>
                  <div className="mat-box">
                    <label htmlFor="answer">Answer</label>
                    <input
                      type="text"
                      name="answer"
                      value={x.answer}
                      required
                      onChange={(e) => handleinputchange(e, i)}
                      placeholder="Write answer"
                    />
                  </div>
                </div>
              </>
            );
          })}
          <div className="btn-box">
            {inputList.length < 5 && (
              <button
                className="add-btn"
                onClick={() => handleaddclick()}
                type="button"
              >
                Add
              </button>
            )}
            {inputList.length > 1 && (
              <button
                className="remove-btn"
                onClick={() => handleremove()}
                type="button"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        <button type="submit" className="create">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateUnits;
