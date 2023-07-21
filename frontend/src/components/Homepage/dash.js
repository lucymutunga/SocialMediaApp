import "./dash.css";
import { BiSolidHome } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BsPostageHeart } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";

const Dash = () => {
  return (
    <div className="sidebar-dash">
      <div className="sidebar-stats-dash">
        <div className="sidebar-icon-dash">
          <BiSolidHome />
          <Link to="/home">
            <h4>Home</h4>
          </Link>
        </div>
        <div className="sidebar-icon-dash">
          <CgProfile />
          <h4>Profile</h4>
        </div>
        <div className="sidebar-icon-dash">
          <BsPostageHeart />
          <h4>Posts</h4>
        </div>
        <div className="sidebar-icon-dash">
          <IoNotifications />
          <h4>Notifications</h4>
        </div>
        <div className="sidebar-icon-dash">
          <MdSettings />
          <h4>Settings</h4>
        </div>
      </div>
    </div>
  );
};
export default Dash;
