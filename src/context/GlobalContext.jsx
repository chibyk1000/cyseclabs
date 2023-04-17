import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const [labsData, setLabsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [notification, setNotification] = useState(true);
  const [newletterMessage, setNewletterMessage] = useState("");
  const [user, setUser] = useState({});
  const [adminUser, setAdminUser] = useState({});
  const [machineData, setMachineData] = useState([]);

  const [labEdit, setLabEdit] = useState({
    room: {},
    edit: false,
  });
  const [machineEdit, setMachineEdit] = useState({
    machine: {},
    edit: false,
  });
  const navigate = useNavigate();

  /**================================================
   *                      AUTHENTICATION
   * ================================================
   */
  const registerUser = async (userData) => {
    setIsLoading(true);

    setResend(true);
    try {
      const resp = await axios.post("/users/register", {
        user: userData,
      });

      //please dont do the below. only for testing purpose
      if (resp.status === 201) {
        setResend(false);
        toast.success("Please Check Your Email For Token");
        setTimeout(() => {
          navigate("/verify");
        }, 1500);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerAdminUser = async (adminData) => {
    setResend(true);
    setIsLoading(true);
    try {
      const resp = await axios.post("/manage/create-admin", {
        user: adminData,
      });

      //please dont do the below. only for testing purpose
      if (resp.status === 201) {
        setResend(false);
        toast.success("Please Check Your Email For Token");
        setTimeout(() => {
          navigate("/verify");
        }, 1500);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyUser = async (token) => {
    setIsLoading(true);
    try {
      const resp = await axios.post("/users/verify", {
        verifyData: token,
      });
      if (resp.status === 200) {
        
        toast.success("Registration Successful");
        setTimeout(() => {
          navigate("/dashboard/home");
        }, 1000);
        setIsLoading(false);
      } else {
        setResend(true);
        toast.error("Please ensure you enter the correct Token");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (userLogin) => {
    setIsLoading(true);
    try {
      const resp = await axios.post("/users/login", { user: userLogin });
      console.log(resp);
      if (resp.status === 200) {
        
        sessionStorage.setItem("token", JSON.stringify(resp.data));
        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/dashboard/home");
        }, 1500);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Incorrect Username or Password");
      }
    } catch (error) {
      //console.log(error.response);
      setIsLoading(false);
      toast.error("Incorrect Username and Password");
      console.log(error);
    }
  };

  const logoutUser = async () => {
    try {
      const resp = await axios.get("/users/logout");
      if (resp.status === 200) {
        sessionStorage.clear();
        navigate("/login");
      }
    } catch (error) {}
  };

  const checkUser = async () => {
    try {
      const resp = await axios.get("/users/user", {
        headers: {
          authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
        },
      });
      console.log(resp);
      const result = resp.data;

      //if user is not logged in no data will be here, so you can redirect them to anywhere.
      if (resp.status === 201) {
        navigate("/dashboard/home");
        fetchLabs();
        fetchMachine();
        setUser(result);
      }
      if (resp.data?.role === "admin") {
        setAdminUser(true);
        return;
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };

  /**================================================
   *                      USEEFFECT CALLS END
   * ================================================
   */

  /**================================================
   *               USEEFFECT CALLS START
   * ================================================
   */
  // useEffect(() => {
  //   checkUser();
  //   checkAdmin();
  //   fetchLabs();
  //   fetchMachine();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  /**
   * =======================================================================================
   * =======================================================================================
   */
  //LABS FUNCTIONS
  /**
   * =======================================================================================
   * =======================================================================================
   */
  //Fetch Labs
  // const response = await fetch(
  //   `https://637a3eb07419b414df9d0572.mockapi.io/labsMachine?_sort=id&_order=desc`
  // );

  const closeNotification = () => {
    setNotification(!notification);
  };

  const fetchLabs = async () => {
    setIsLoading(true);

    const resp = await axios.get("/users/getlabs", {
      headers: {
        authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
      },
    });
    //console.log(resp);
    if (resp.data){
      setIsLoading(false);
      setLabsData(resp.data);
    }
  };

  //Delete Labs
  const deleteLab = async (id) => {
    try {
      await axios.post(
        "/manage/delete-lab",
        {
          labData: { labID: id },
        },
        {
          headers: {
            authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
          },
        }
      );
      setLabsData(labsData.filter((item) => item.id !== id));
      //console.log(resp);
    } catch (error) {
      console.log(error);
    }
    // if (window.confirm("Are you sure you want to delete?")) {
    //   await fetch(
    //     `https://637a3eb07419b414df9d0572.mockapi.io/labsMachine/${id}`,
    //     { method: "DELETE" }
    //   );
    //   setLabsData(labsData.filter((item) => item.id !== id));
    // }
  };

  //Add New lab
  const addLab = async (newLab) => {
    try {
      const resp = await axios.post(
        "/manage/create-new-lab",
        {
          labInfo: newLab,
        },
        {
          headers: {
            authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
          },
        }
      );
      const data = resp.data;
      setLabsData([data, ...labsData]);
      toast.success("Lab Added Successfully");
    } catch (error) {
      toast.error(error, "Lab not created");
    }
  };

  //UPDATE Lab
  const editLab = (lab) => {
    setLabEdit({ lab, edit: true }); //console.log(resp);
  };

  //Update_Labs but it adds a new Item
  const updateLab = async (id, upIdLab) => {
    console.log(upIdLab);
    try {
      const resp = await axios.post(
        "/manage/edit-lab",
        {
          labInfo: { labID: id, upIdLab },
        },
        {
          headers: {
            authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
          },
        }
      );
      console.log(resp);
      // window.location.reload();
      setLabsData(
        labsData.map((lab) => (lab.id === id ? { ...lab, ...resp } : lab))
      );
    } catch (error) {
      console.log(error);
    }

    // setLabsData(
    //   labsData.map((room) => (room.id === id ? { ...room, ...data } : room))
    // );
  };
  /**
   * =======================================================================================
   * =======================================================================================
   */
  //LABS FUNCTIONS
  /**
   * =======================================================================================
   * =======================================================================================
   */

  /**
   * =======================================================================================
   * =======================================================================================
   */
  //MACHINE FUNCTIONS
  /**
   * =======================================================================================
   * =======================================================================================
   */

  //Fetch_Machine
  const fetchMachine = async () => {
    const response = await fetch(
      `https://637a3eb07419b414df9d0572.mockapi.io/labtasks?_sort=id&_order=desc`
    );
    const mData = await response.json();
    setMachineData(mData);
    setIsLoading(false);
  };

  //Delete_Machine
  const deleteMachine = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(
        `https://637a3eb07419b414df9d0572.mockapi.io/labtasks/${id}`,
        { method: "DELETE" }
      );
      setMachineData(machineData.filter((item) => item.id !== id));
    }
  };

  //Add New Machine
  const addMachine = async (newMachine) => {
    const response = await fetch(
      "https://637a3eb07419b414df9d0572.mockapi.io/labtasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMachine),
      }
    );
    try {
      const data = await response.json();
      setMachineData([data, ...machineData]);
      toast.success("Machine Added Successfully");
    } catch (error) {
      toast.error(error, "Machine not created");
    }
  };

  //UPDATE Machine
  const editMachine = (machine) => {
    setMachineEdit({
      machine,
      edit: true,
    });
  };

  //Update_Machine but it adds a new Item
  const updateMachine = async (id, upIdMachine) => {
    const response = await fetch(
      `https://637a3eb07419b414df9d0572.mockapi.io/labtasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(upIdMachine),
      }
    );

    const data = await response.json();

    setMachineData(
      machineData.map((machine) =>
        machine.id === id ? { ...machine, ...data } : machine
      )
    );
  };

  /**
   * =======================================================================================
   * =======================================================================================
   */
  //Mini FUNCTIONS
  /**
   * =======================================================================================
   * =======================================================================================
   */
  // ====================
  // SEARCH FUNCTION
  // ====================
  const search = async (query) => {
    try {
      const resp = await axios.post(
        "/users/search",
        {
          query: query,
        },
        {
          headers: {
            authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
          },
        }
      );
      const look = resp.data;
      console.log(look);

      function matchValue(items, key, value) {
        return items.filter((item) => item[key] === value);
      }

      const searched = matchValue(look, "name", query.query);
      setSearchResults(searched);
      // console.log(searched);
      // console.log(searchResults);
    } catch (error) {
      console.log(error);
      toast.error(error, "No related match found");
    }
  };

  // ====================
  // Newsletter FUNCTION
  // ====================
  const newsletter = async (email) => {
    try {
      const resp = await axios.post(
        "/users/join-newsletter",
        { email: email },
        {
          headers: {
            authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
          },
        }
      );
      const look = resp.data;
      console.log(look);
      setNewletterMessage(look.message);
      // console.log(searchResults);
    } catch (error) {
      console.log(error);
      toast.error(
        error,
        "There was an error subscribing you to our newsletter"
      );
    }
  };
  /**
   * =======================================================================================
   * =======================================================================================
   */
  //MACHINE FUNCTIONS
  /**
   * =======================================================================================
   * =======================================================================================
   */

  return (
    <GlobalContext.Provider
      value={{
        search,
        labsData,
        machineData,
        deleteLab,
        addLab,
        editLab,
        editMachine,
        updateLab,
        addMachine,
        machineEdit,
        deleteMachine,
        updateMachine,
        labEdit,
        resend,
        isLoading,
        verifyUser,
        registerUser,
        loginUser,
        logoutUser,
        user,
        adminUser,
        checkUser,
        closeNotification,
        notification,
        searchResults,
        registerAdminUser,
        newsletter,
        newletterMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContext;
//linear-gradient(270deg, rgb(19, 173, 199) 0%, rgb(148, 93, 214) 100%)
