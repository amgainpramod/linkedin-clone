import React, { useEffect, useState, useCallback } from "react";
import "./Feed.css";
import { Avatar } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import InputOption from "./InputOption";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  serverTimestamp,
  query,
} from "firebase/firestore";
import Post from "./Post";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { getInitials } from "./Utils";
import FlipMove from "react-flip-move";

function Feed() {
  //? //To access the message post
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  const user = useSelector(selectUser);

  //? Allows us to fire off the code when the feed components loads. it also fires off the code whenever the component re-renders if we donot pass the second argument ( blank -[] fires off once when the component loads but not again after that, [secondArgument] -> )

  //!Snapshot -> every time the post get added to, deletes or changes or anything, it gives off the snapshot of the data

  // useEffect(() => {
  //   db.collection("posts")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) => {
  //       setPosts(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data(),
  //         }))
  //       );
  //     });
  // }, []);
  // console.log(posts);

  const postsCollectionRef = collection(db, "posts");

  const getPosts = useCallback(async () => {
    const queryData = query(postsCollectionRef, orderBy("timestamp", "desc"));
    const data = await getDocs(queryData);
    setPosts(
      data.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    );
  }, [postsCollectionRef]);

  useEffect(() => {
    getPosts();
  }, []);

  //! Push to db when a post is made
  // const sendPost = (e) => {
  //   e.preventDefault();

  //   db.collection("posts").add({
  //     name: user.displayName,
  //     description: user.email,
  //     message: input,
  //     photoUrl: user.photoUrl || "",
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //   });

  const sendPost = async (e) => {
    e.preventDefault();

    await addDoc(postsCollectionRef, {
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: serverTimestamp(),
    });

    //!Clearing the input field after a post  is made
    setInput("");
    getPosts();
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        {/* <CreateIcon /> */}
        <div className="feed__icon--input">
          <Avatar className="feed__inputIcon" src={user.photoUrl}>
            {getInitials(user.displayName)}
          </Avatar>
          <div className="feed__input">
            <form>
              <input
                placeholder="Start a post"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
              />
              <button onClick={sendPost} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="feed__inputOption">
          {/* InputOption */}
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          {/* InputOption */}
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          {/* InputOption */}
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          {/* InputOption */}
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>
      {/* POSTS */}
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            id={id}
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
            getPosts={getPosts}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
