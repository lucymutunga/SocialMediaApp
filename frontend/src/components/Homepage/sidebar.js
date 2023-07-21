import "./sidebar.css";
import mainlogo from "../../assets/logo.png";

import { BiSolidHome } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BsPostageHeart } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={mainlogo} alt="logo" className="sidebar_logo" />
      <h4>Tujuane</h4>
      <div className="sidebar-stats">
        <div className="sidebar-icon">
          <BiSolidHome />

          <h1>Home</h1>
        </div>
        <div className="sidebar-icon">
          <CgProfile />
          <Link to="/user">
            <h1>Profile</h1>
          </Link>
        </div>
        <div className="sidebar-icon">
          <BsPostageHeart />
          <h1>Posts</h1>
        </div>
        <div className="sidebar-icon">
          <IoNotifications />
          <h1>Notifications</h1>
        </div>
        <div className="sidebar-icon">
          <MdSettings />
          <h1>Settings</h1>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
