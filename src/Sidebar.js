import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Sidebar.css";
import { getInitials } from "./Utils";

function Sidebar() {
  //!pull the user information from redux db
  const user = useSelector(selectUser);

  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
          alt=""
        />
        <Avatar src={user.photoUrl} className="sidebar__avatar">
          {getInitials(user.displayName)}
        </Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Connections</p>
          <p className="sidebar__statNumber">4001</p>

          {/* <p>Grow your network</p> */}
        </div>
        <div className="sidebar__stat">
          <p>Who viewed your profile</p>
          <p className="sidebar__statNumber">4007</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem("react.js")}
        {recentItem("programming")}
        {recentItem("softwarearchitecure")}
        {recentItem("design")}
        {recentItem("developer")}
      </div>
    </div>
  );
}

export default Sidebar;
