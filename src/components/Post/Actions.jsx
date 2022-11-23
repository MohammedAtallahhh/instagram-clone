import React, { useContext, useEffect, useState } from "react";

import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

import { GlobalContext } from "../../context/globalContext";
import { db } from "../../lib/firebase";

import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const Actions = ({ id, handleFocus, likesCount, hasLiked }) => {
  const {
    state: { user },
  } = useContext(GlobalContext);

  const [liked, setLiked] = useState(null);
  const [liking, setLiking] = useState(false);
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    setLiked(hasLiked);
    setLikes(likesCount);
  }, [hasLiked, likesCount]);

  const handleToggleLiked = async () => {
    setLiking(true);
    setLiked((liked) => !liked);

    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, {
      likes: liked ? arrayRemove(user.id) : arrayUnion(user.id),
    });

    setLikes((likes) => (liked ? likes - 1 : likes + 1));
    setLiking(false);
  };

  return (
    <div className="px-3">
      {user ? (
        <div className="flex items-center gap-4 py-2">
          <button
            name="like"
            onClick={handleToggleLiked}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleToggleLiked();
              }
            }}
            disabled={liking}
          >
            {liking ? (
              <ImSpinner2 size={26} className="text-red-primary" />
            ) : liked === false ? (
              <BsHeart size={26} />
            ) : (
              <BsFillHeartFill size={26} className="text-red-primary" />
            )}
          </button>

          <button
            name="comment"
            onClick={handleFocus}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleFocus();
              }
            }}
          >
            <FaRegCommentDots size={26} />
          </button>
        </div>
      ) : null}

      <div className="py-1">
        <p className="font-medium">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </div>
  );
};

export default Actions;
