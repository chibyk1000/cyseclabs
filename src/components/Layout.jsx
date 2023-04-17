// import axios from "axios";
// import Cookies from "js-cookie";
// import React, { useEffect } from "react";

// const Layout = ({ children }) => {
//   const getUser = async () => {
//     try {
//       const resp = await axios.get("http://localhost:8081/api/v1/users/user", {
//         headers: {
//           authorization: Cookies.get("token"),
//         },
//       });
//       console.log(resp.data);
//       Cookies.set("user", JSON.stringify(resp.data), {
//         secure: true,
//         path: "/",
//       });

//       //if user is not logged in no data will be here, so you can redirect them to anywhere.
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);
//   return <>{children}</>;
// };

// export default Layout;
