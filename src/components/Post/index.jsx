/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useRef, useState } from "react";

import { doc, getDoc, onSnapshot } from "firebase/firestore";

import Actions from "./Actions";
import Comments from "./Comments";
import Header from "./Header";
import AddComment from "./AddComment";

import { GlobalContext } from "../../context/globalContext";
import { useLikes } from "../../hooks/useLikes";
import { db } from "../../lib/firebase";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";

const Post = ({ data }) => {
  const { id, imageSrc, caption, likes, comments, dateCreated, user_id } = data;

  const [userData, setUserData] = useState(null);
  const [realtimeComments, setRealtimeComments] = useState(comments);
  const [exists, setExists] = useState(true);

  const {
    state: { user },
  } = useContext(GlobalContext);

  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  useEffect(() => {
    const un = onSnapshot(doc(db, "posts", id), (newPost) => {
      if (!newPost.exists()) {
        setExists(false);
        return;
      }
      setRealtimeComments(newPost.data().comments);
    });

    return () => un();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const userRef = doc(db, "users", user_id);
      const res = await getDoc(userRef);

      let hasLiked = !!likes.find((l) => l === user?.id);
      setUserData({
        hasLiked,
        ...res.data(),
      });
    };

    getUserData();
  }, []);

  let { likesCount, liked, liking, handleToggleLiked } = useLikes({
    hasLiked: userData?.hasLiked,
    likesCount: likes.length,
    postId: id,
  });

  return exists ? (
    <div className="rounded mb-12 border border-gray-primary bg-white">
      <Header
        fullName={userData?.fullName}
        postId={id}
        userId={user_id}
        userImage={userData?.profilePicture}
        imageSrc={imageSrc}
      />

      <div
        onDoubleClick={() => handleToggleLiked(user.id)}
        className="relative flex justify-center items-center min-h-[200px] mb-2"
      >
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
          className={`border-b border-gray-primary`}
          style={{ animation: "fade 0.3s ease-in" }}
        />
      </div>

      <div className="px-3 text-sm">
        <Actions
          handleFocus={handleFocus}
          likes={likesCount}
          liking={liking}
          liked={liked}
          handleToggleLiked={handleToggleLiked}
          userId={user?.id}
        />

        <div
          className={`mb-2 pb-2 ${
            realtimeComments.length ? "border-b border-gray-light" : ""
          }`}
        >
          <Link href={`/p/${user_id}`} className="mr-2 font-semibold">
            {userData?.fullName}
          </Link>
          <span className="italic">{caption ? caption : "No Caption."}</span>
        </div>

        <Comments
          id={id}
          comments={realtimeComments}
          dateCreated={dateCreated}
          commentInput={commentInput}
        />
      </div>

      {user ? <AddComment id={id} commentInput={commentInput} /> : null}
    </div>
  ) : null;
};

export default Post;
