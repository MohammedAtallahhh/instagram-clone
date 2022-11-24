import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";

export const useLikes = ({ hasLiked, likesCount, userId, postId }) => {
  const [liked, setLiked] = useState(null);
  const [liking, setLiking] = useState(false);
  const [likes, setLikes] = useState(null);

  const handleToggleLiked = async (id) => {
    if (!id) return;
    setLiking(true);
    setLiked((liked) => !liked);

    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: liked ? arrayRemove(id) : arrayUnion(id),
    });

    setLikes((likes) => (liked ? likes - 1 : likes + 1));
    setLiking(false);
  };

  useEffect(() => {
    setLiked(hasLiked);
    setLikes(likesCount);
  }, [hasLiked, likesCount]);

  return { likesCount: likes, liking, liked, handleToggleLiked };
};
