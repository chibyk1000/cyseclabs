import { Routes, Route } from "react-router-dom";
import Competition from "./pages/Competition/Competition";
import Dashboard from "./pages/Dashboard/Dashboard";
import Forgot from "./Auth/Forgot";
import Home from "./pages/Home/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Reset from "./Auth/Reset";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "./context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";
import Machine from "./components/Machine";
import NotFound from "./pages/NotFound";
import CreateLab from "./admin/CreateLab";
import Labs from "./components/Labs";
import Leaderboard from "./components/Leaderboard";
import CreateMaterials from "./admin/CreateMaterials";
import Settings from "./components/Settings";
import DashboardHome from "./components/DashboardHome";
import DownloadVPN from "./components/DownloadVPN";
import AdminAccess from "./admin/AdminAccess";
//import Layout from "./components/Layout";
import Verify from "./Auth/Verify";
import axios from "axios";
import SuperAdmin from "./admin/SuperAdmin";
import SearchPage from "./components/SearchPage";

function App() {
  axios.defaults.withCredentials = true;

  return (
    <>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/superadmin" element={<SuperAdmin />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home" element={<DashboardHome />} />
            <Route path="downloadvpn" element={<DownloadVPN />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="labs" element={<Labs />} />
            <Route path="settings" element={<Settings />} />
            <Route path="labs/:id" element={<Machine />} />
            <Route element={<AdminAccess />}>
              <Route path="createlab" element={<CreateLab />} />
              <Route path="creatematerials" element={<CreateMaterials />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </GlobalProvider>
    </>
  );
}

export default App;
