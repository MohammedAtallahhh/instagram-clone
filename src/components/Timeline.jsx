import React, { useContext, useEffect, useState } from "react";

import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";

import Post from "./Post";

import { db } from "../lib/firebase";
import { GlobalContext } from "../context/globalContext";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const {
    state: { user },
  } = useContext(GlobalContext);

  const following = user?.following;

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"));
      const res = await getDocs(q);

      const postsData = await Promise.all(
        res.docs.map(async (post) => {
          const userRef = doc(db, "users", post.data().user_id);
          const res = await getDoc(userRef);

          let hasLiked = !!post.data().likes.find((l) => l === user?.id);
          return {
            id: post.id,
            ...post.data(),
            hasLiked,
            userData: res.data(),
          };
        })
      );

      setPosts(postsData);
    };

    if (user?.id) {
      fetchPosts();
    }
  }, [user]);
  return (
    <div className="flex justify-center">
      {following === undefined ? (
        <Skeleton count={3} width={400} height={500} className="mb-5" />
      ) : following.length === 0 ? (
        <p className="flex justify-center font-bold">
          Follow other people to see Photos
        </p>
      ) : posts ? (
        <ul>
          {posts.map((p) => (
            <Post key={p.id} data={p} />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Timeline;
