import { useState, useEffect, useContext, useRef } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from "@cloudinary/url-gen";
import GlobalContext from "../context/GlobalContext";
import "./Admin.css";
import Preview from "./Preview";
import { useNavigate } from "react-router-dom";

function CreateLab() {
  const navigate = useNavigate();
  // const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const { addLab, labEdit, updateLab, labsData } = useContext(GlobalContext);
  // const [formData, setFormData] = useState(labsData);
  const [file, setFile] = useState(null);
  const [labImage, setLabImage] = useState(null);

  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const tagsRef = useRef("");
  const pathRef = useRef("");
  const categoryRef = useRef("");
  const labImageRef = useRef(null);

  const myImage = new CloudinaryImage("sample", {
    cloudName: "dpvl31dut",
  }).resize(fill().width(100).height(150));

  //For Categories
  const categories = [
    { id: 1, name: "web" },
    { id: 2, name: "linux" },
    { id: 3, name: "forensics" },
    { id: 4, name: "windows" },
    { id: 5, name: "cryptography" },
    { id: 6, name: "osint" },
  ];

  const teams = [
    { id: 1, name: "redteam" },
    { id: 2, name: "blueteam" },
  ];

  //This part help trigger the button to update it, the labEdit

    if (labEdit.edit === true) {
      //window.location.reload();
      nameRef.current.value = labEdit.lab.name;
      [tagsRef.current.value] = labEdit.lab.tags;
      descriptionRef.current.value = labEdit.lab.description;
      categoryRef.current.value = labEdit.lab.category;
      pathRef.current.value = labEdit.lab.path;
    }
 

  // const onChange = (e) => {
  //   //   For Image Review
  //   //For files
  //   if (e.target.files) {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       image: e.target.files[0],
  //     }));
  //     setFile(e.target.files[0]);
  //   }
  //   //For text/boolean/numbers
  //   if (!e.target.files) {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [e.target.id]: e.target.value,
  //     }));
  //   }
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      tags: [tagsRef.current.value],
      path: pathRef.current.value,
      category: categoryRef.current.value,
      labImage: labImageRef.current.value,
    };
    if (labEdit.edit === true) {
      updateLab(labEdit.lab.id, data);
      labEdit.edit = false;
    } else {
      addLab(data);
    }
    // delete labsDataCopy.image;
    console.log(labsData);
    window.location.reload();
    //console.log(data);
    //Check if the labEdit function is triggered, if yes, update the id of the document

    setLabImage(null);
  };

  // useEffect(() => {
  //   let fileReader,
  //     isCancel = false;
  //   if (file) {
  //     fileReader = new FileReader();
  //     fileReader.onload = (e) => {
  //       const { result } = e.target;
  //       if (result && !isCancel) {
  //         setLabImage(result);
  //       }
  //     };
  //     fileReader.readAsDataURL(file);
  //   }
  //   return () => {
  //     isCancel = true;
  //     if (fileReader && fileReader.readyState === 1) {
  //       fileReader.abort();
  //     }
  //   };
  // }, [file]);

  return (
    <div className="box create-labs">
      <h5>Create Lab</h5>
      <form onSubmit={onSubmit} className="adminForm">
        <div className="form1">
          <div className="form-box">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              placeholder="Enter Lab Name"
              required
            />
          </div>
          <div className="form-box">
            <label htmlFor="tag">
              Tags <span>minimum of 5 tags</span>
            </label>
            <input
              type="text"
              ref={tagsRef}
              id="tags"
              required
              placeholder="Separate Tags With Commas"
            />
          </div>
          <div className="form-box">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              ref={descriptionRef}
              placeholder="Enter description of lab"
            ></textarea>
          </div>
        </div>

        <div className="form2">
          <div className="form-box">
            <label htmlFor="category">Choose category</label>
            <select
              id="category"
              name="category"
              ref={categoryRef}
              form="category"
              required
            >
              <option>-- Category --</option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>{" "}
          </div>
          <div className="form-box">
            <label htmlFor="path">Select Team</label>
            <select id="path" name="path" ref={pathRef} form="team" required>
              <option>-- TEAM --</option>
              {teams.map((team) => {
                return (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                );
              })}
            </select>{" "}
          </div>
          <div className="form-box">
            <label htmlFor="image">
              Thumbnail{" "}
              <small style={{ marginLeft: "2rem", color: "yellow" }}>
                Less than 200kb
              </small>
            </label>
            <div className="form-box-upload">
              <div className="upload">
                <RiUploadCloudFill size="60px" color="#15c3ab9c" />
                <br />
                <p>Drag & Drop Your Files Here</p>
                <input
                  type="file"
                  ref={labImageRef}
                  name="image"
                  id="image"
                  accept="image/x-png,image/jpeg"
                />
              </div>
              {labImage ? (
                <div
                  className="preview"
                  style={{ backgroundImage: `url(${labImage})` }}
                >
                  &nbsp;
                </div>
              ) : (
                <div
                  className="preview"
                  style={{ backgroundColor: "#ffffff21" }}
                >
                  &nbsp;
                </div>
              )}
            </div>
          </div>
        </div>

        {labEdit.edit ? (
          <button type="submit" className="create">
            Update
          </button>
        ) : (
          <button type="submit" className="create">
            Create
          </button>
        )}
      </form>

      <div className="display-labs">
        {labsData.map((prevLab) => (
          <Preview preview={prevLab} key={prevLab.id} id={prevLab.id} />
        ))}
      </div>
    </div>
  );
}

export default CreateLab;
