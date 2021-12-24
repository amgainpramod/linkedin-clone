import { Avatar } from "@material-ui/core";
import React, { forwardRef, useRef } from "react";
import InputOption from "./InputOption";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import "./Post.css";
import { getInitials } from "./Utils";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { db } from "./firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { useState } from "react";
import { useEffect } from "react";

const Post = forwardRef(
  ({ id, name, description, message, photoUrl, getPosts }, ref) => {
    const toggleRef = useRef(null);
    const [moreIconClicked, setMoreIconClicked] = useState(false);

    const toggleOptions = () => {
      console.log(toggleRef);
      toggleRef.current.classList.toggle("post__headerDropDown--show");
      setMoreIconClicked(true);
    };

    const deletePost = async (e, id) => {
      e.preventDefault();
      const userDoc = doc(db, "posts", id);
      await deleteDoc(userDoc);
      getPosts();
    };

    // const deletePost = async (e, id) => {
    //   e.preventDefault();
    //   const userDoc = doc(db, "posts", id);
    //   await deleteDoc(userDoc);
    // };

    return (
      <div ref={ref} className="post">
        {/* Post header with image and name */}
        <div className="post__header">
          <div className="post__headerLeft">
            <Avatar className="post__icon" src={photoUrl}>
              {getInitials(name)}
            </Avatar>
            <div className="post__info">
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          </div>
          <div className="post__headerRight">
            <div className="post__headerDropdown">
              <MoreHorizIcon onClick={toggleOptions} />
              <div
                ref={toggleRef}
                id="post__dropdownId"
                className="post__dropdownContent"
              >
                <li>Edit</li>
                <li onClick={(e) => deletePost(e, id)}>Delete</li>
              </div>
            </div>
          </div>
        </div>
        <div className="post__body">
          <p>{message}</p>
        </div>

        <div className="post__buttons">
          <InputOption
            Icon={ThumbUpAltOutlinedIcon}
            title="Like"
            color="gray"
          />
          <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
          <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
          <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
        </div>
      </div>
    );
  }
);

export default Post;
