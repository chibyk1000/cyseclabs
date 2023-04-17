import React, { useContext, useState } from "react";
import { CgCheck } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import GlobalContext from "../context/GlobalContext";

function Settings() {
  const { getUser } = useContext(GlobalContext);

  const [toggleUpdate, setToggleUpdate] = useState(false);
  const handleUpdate = () => {
    setToggleUpdate((current) => !current);
  };
  const onSubmit = (e) => {
    e.preventdefault();
  };

  // const checkStatus = () => {
  //   getUser();
  // };
  // checkStatus();
  return (
    <div className="box" style={{ overflowY: "scroll" }} id="vpn">
      <div className="editProfile">
        Profile
        <div className="editBtn">
          <CiEdit
            onClick={handleUpdate}
            color="#fff"
            size="40px"
            style={{
              backgroundColor: "#87ffff5c",
              padding: ".8rem",
              borderRadius: "50%",
              marginRight: "3rem",
            }}
          />
          <h6>Edit profile</h6>
        </div>
      </div>
      <div className="">
        <div className="profileTop">
          <div className="profileImg">
            {toggleUpdate && (
              <label htmlFor="">
                <FaCloudUploadAlt size="15px" />
                &nbsp;&nbsp; Upload Image
              </label>
            )}
            <img
              src="https://pbs.twimg.com/profile_images/1486097486787792899/qXpycKIe_400x400.jpg"
              alt=""
            />
            {toggleUpdate && (
              <div className="profileImgSave">
                <h5>Save</h5>&nbsp;
                <CgCheck size="20px" />
              </div>
            )}
          </div>
          <div className="profileData">
            <div className="profileName">
              <h4>
                <span
                  style={{
                    color: "#ffed50",
                    fontSize: "2.4rem",
                    fontWeight: "400",
                  }}
                >
                  Michael
                </span>
              </h4>
              <h5>
                Level:&nbsp;&nbsp;&nbsp;<span>M4</span>
              </h5>
            </div>
            <div className="profileRank">
              <h4>
                Email:&nbsp;&nbsp;&nbsp;<span>testemail@cysec.com</span>
              </h4>
              <h4>
                Phone Number:&nbsp;&nbsp;&nbsp;<span>+2348103387068</span>
              </h4>
            </div>
            <div className="profileRank">
              <h4>
                Rating:&nbsp;&nbsp;&nbsp;<span>1300</span>
              </h4>
              <h4>
                Active Room:&nbsp;&nbsp;&nbsp;<span>4</span>
              </h4>
              <h4>
                Labs Completed:&nbsp;&nbsp;&nbsp;<span>13</span>
              </h4>
            </div>
          </div>
        </div>
        <div className="profileBottom">
          <div className="profileDesc">
            <h4>About</h4>
            <p>
              My name is Michael Osas, I am an experienced frontend developer
              with 6+ years of experience in web development. I have a strong
              background in project management and team leadership.
            </p>
          </div>
        </div>
        {toggleUpdate && (
          <div className="updateProfileSec">
            <div className="divider">&nbsp;</div>
            <div className="profileDesc">
              <h4>Update Profile</h4>
            </div>
            <form onSubmit={onSubmit} className="adminForm">
              <div className="form1">
                <div className="form-box">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" />
                </div>
                <div className="form-box">
                  <label htmlFor="phone-number">Phone Number</label>
                  <input type="text" id="phone-number" />
                </div>
              </div>

              <div className="form2">
                <div className="form-box">
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" />
                </div>
                <div className="form-box">
                  <label htmlFor="desc">Description</label>
                  <textarea id="desc"></textarea>
                </div>
              </div>

              <button type="submit" className="create">
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
