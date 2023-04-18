import axios from "axios";
import React from "react";
import { RiUploadCloudFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditLab = () => {
  const [data, setData] = React.useState([]);
  const { id } = useParams();
  const [labImage, setLabImage] = React.useState(null);

  const nameRef = React.useRef("");
  const descriptionRef = React.useRef("");
  const tagsRef = React.useRef("");
  const pathRef = React.useRef("");
  const categoryRef = React.useRef("");
  const labImageRef = React.useRef(null);
  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/users/getlab/${id}`, {
          headers: {
            authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
          },
        });
        if (response.data) {
          tagsRef.current.value = response.data.tags.join(", ");
          pathRef.current.value = response.data.path;
          descriptionRef.current.value = response.data.description;
          nameRef.current.value = response.data.name;

          categoryRef.current.value = response.data.category;
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

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
  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      const formdata = new FormData();
      formdata.append("name", nameRef.current.value);
      formdata.append("description", descriptionRef.current.value);
      formdata.append("tags", tagsRef.current.value);
      formdata.append("path", pathRef.current.value);
      formdata.append("category", categoryRef.current.value);
      formdata.append("labID", id);
      if (labImageRef.current.files) {
        formdata.append("labImage", labImageRef.current.files[0]);
      } else {
        formdata.append("imageUrl", data.labImage);
      }
      const resp = await axios.post("/manage/edit-lab", formdata, {
        headers: {
          authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
        },
        withCredentials: true,
      });
      if (resp.status === 200) {
        toast.success("lab updated");
      } else toast.error(resp.response.data.message);
    } catch (error) {}
  };
  return (
    <div className="box">
      <form onSubmit={onSubmit} className="">
        <div className="form1 form-grid">
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
        </div>
        <div className="form2 form-grid">
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
        </div>
        <div className="form-grid">
          <div className="form-box">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              ref={descriptionRef}
              placeholder="Enter description of lab"
            ></textarea>
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
            </div>
          </div>
        </div>
        <button type="submit" className="create">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditLab;
