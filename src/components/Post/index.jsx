/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";

import { doc, onSnapshot } from "firebase/firestore";

import Actions from "./Actions";
import Comments from "./Comments";
import Header from "./Header";
import { db } from "../../lib/firebase";
import Image from "next/image";

const Post = ({ data }) => {
  const {
    id,
    imageSrc,
    caption,
    likes,
    comments,
    dateCreated,
    user_id,
    userData: { username, auth_id },
  } = data;

  const [realtimeComments, setRealtimeComments] = useState(comments);
  const [exists, setExists] = useState(true);

  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  useEffect(() => {
    onSnapshot(doc(db, "posts", id), (newPost) => {
      if (!newPost.exists()) {
        setExists(false);
        return;
      }
      setRealtimeComments(newPost.data().comments);
    });
  }, []);

  return exists ? (
    <div className="rounded mb-12 border bg-white border-gray-primary">
      <Header
        username={username}
        auth_id={auth_id}
        postId={id}
        userId={user_id}
      />

      <div className="relative flex justify-center items-center min-h-[200px] mb-2">
        {/* <Image
          src={imageSrc}
          alt={caption}
          className="mb-3 border-b border-gray-primary"
          layout="fill"
          objectFit="contain"
          loading="lazy"
        /> */}
        <img
          src={imageSrc}
          alt={caption}
          className="mb-3 border-b border-gray-primary"
        />
      </div>

      <Actions
        id={id}
        likesCount={likes.length}
        hasLiked={data.hasLiked}
        handleFocus={handleFocus}
      />

      <div
        className={`mx-6 mb-2 pb-2 ${
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
  ) : null;
};

export default Post;
