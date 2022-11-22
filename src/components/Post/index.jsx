/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";

import { doc, onSnapshot } from "firebase/firestore";

import Actions from "./Actions";
import Comments from "./Comments";
import Header from "./Header";
import { db } from "../../lib/firebase";

const Post = ({ data }) => {
  const {
    id,
    imageSrc,
    caption,
    likes,
    comments,
    dateCreated,
    userData: { username, auth_id },
  } = data;

  const [realtimeComments, setRealtimeComments] = useState(comments);

  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  useEffect(() => {
    onSnapshot(doc(db, "posts", id), (newPost) => {
      setRealtimeComments(newPost.data().comments);
    });
  }, []);

  return (
    <div className="rounded mb-12 border bg-white border-gray-primary">
      <Header username={username} auth_id={auth_id} />

      <img src={imageSrc} alt={caption} className="mb-3" />

      <Actions
        id={id}
        likesCount={likes.length}
        hasLiked={data.hasLiked}
        handleFocus={handleFocus}
      />

      <div
        className={`mx-6 my-1 py-2 ${
          realtimeComments.length ? "border-b border-gray-light" : ""
        }`}
      >
        <span className="mr-2 font-semibold">{username}</span>
        <span className="italic">{caption ? caption : "No Caption."}</span>
      </div>

      <Comments
        id={id}
        comments={realtimeComments}
        dateCreated={dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

export default Post;
