import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
let refresh = false;
axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      const response = await axios.post("/users/refresh", {}, {});

      if (response.status === 200) {
        sessionStorage.setItem("token", JSON.stringify(response.data));
        return axios(error.config);
      }
      //window.location.replace("http://localhost:3000/login");
    }
    refresh = false;
    return error;
  }
);
