/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useRef, useState } from "react";

import { doc, getDoc, onSnapshot } from "firebase/firestore";

import Actions from "./Actions";
import Comments from "./Comments";
import Header from "./Header";
import AddComment from "./AddComment";

import { GlobalContext } from "../../context/globalContext";
import { useLikesAndCommetns } from "../../hooks/useLikesAndComments";
import { db } from "../../lib/firebase";
import Link from "next/link";
import Image from "next/image";

const Post = ({ data }) => {
  const { id, imageSrc, caption, likes, comments, dateCreated, user_id } = data;

  const [userData, setUserData] = useState(null);

  const {
    state: { user },
  } = useContext(GlobalContext);

  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

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
  }, [likes, user_id, user?.id]);

  const { realtimeLikes, realtimeComments, liking, handleToggleLike, exists } =
    useLikesAndCommetns({
      likes,
      comments,
      postId: id,
      userId: user?.id,
    });

  return exists ? (
    <div className="mb-12 bg-white border rounded shadow-md border-gray-primary">
      <Header
        fullName={userData?.fullName}
        postId={id}
        userId={user_id}
        userImage={userData?.profilePicture}
        imageSrc={imageSrc}
      />

      <div
        onDoubleClick={handleToggleLike}
        className="relative flex justify-center items-center max-h-[500px] overflow-hidden mb-2"
      >
        <Image
          src={imageSrc}
          alt={caption}
          fill
          loading="lazy"
          className="mb-3 min-h-[300px] border-b border-gray-primary !relative"
          style={{ animation: "fade 0.3s ease-in" }}
        />
      </div>

      <div className="px-3 text-sm">
        <Actions
          handleFocus={handleFocus}
          likes={realtimeLikes.length}
          liking={liking}
          liked={realtimeLikes.includes(user?.id)}
          handleToggleLike={handleToggleLike}
          userId={user?.id}
        />
        <div
          className={`mb-4 pb-2 ${
            realtimeComments.length ? "border-b border-gray-light" : ""
          }`}
        >
          <Link href={`/p/${user_id}`} className="mr-2 font-semibold">
            {userData?.fullName}
          </Link>
          <span>{caption ? caption : "No Caption."}</span>
        </div>

        <div className="max-h-[300px] overflow-auto no-scrollbar">
          <Comments
            id={id}
            comments={realtimeComments}
            dateCreated={dateCreated}
            commentInput={commentInput}
          />
        </div>
      </div>

      {user ? <AddComment id={id} commentInput={commentInput} /> : null}
    </div>
  ) : null;
};

export default Post;
