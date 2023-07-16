import React from "react";
import Sidebar from "./sidebar";
import Feed from "./Feed";
import Notifications from "./notification";
import "../../App.css";
const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <Feed />
      <Notifications />
    </div>
  );
};

export default Home;
