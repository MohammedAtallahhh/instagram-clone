import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";

export const useLikesAndCommetns = ({ postId, userId, likes, comments }) => {
  const [realtimeLikes, setRealtimeLikes] = useState(likes);
  const [realtimeComments, setRealtimeComments] = useState(comments);

  const [liking, setLiking] = useState(false);
  const [exists, setExists] = useState(true);

  useEffect(() => {
    const un = onSnapshot(doc(db, "posts", postId), (newPost) => {
      if (!newPost.exists()) {
        setExists(false);
        return;
      }
      setRealtimeLikes(newPost.data().likes);
      setRealtimeComments(newPost.data().comments);
    });

    return () => un();
  }, [postId]);

  const handleToggleLike = async () => {
    if (!userId) return;

    setLiking(true);

    const postRef = doc(db, "posts", postId);
    const res = await getDoc(postRef);

    const liked = res.data().likes.find((l) => l === userId);

    await updateDoc(postRef, {
      likes: liked ? arrayRemove(userId) : arrayUnion(userId),
    });

    setLiking(false);
  };

  return { handleToggleLike, liking, realtimeLikes, realtimeComments, exists };
};
