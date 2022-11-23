import React, { useContext, useEffect, useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import Skeleton from "react-loading-skeleton";

import Post from "./Post";

import { db } from "../lib/firebase";
import { GlobalContext } from "../context/globalContext";

const Timeline = () => {
  const [posts, setPosts] = useState(null);
  const {
    state: { user },
  } = useContext(GlobalContext);

  const following = user?.following;

  const fetchPosts = async () => {
    const q = query(collection(db, "posts"));
    const res = await getDocs(q);

    let postsData = await Promise.all(
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

    postsData = postsData.sort((a, b) => b.dateCreated - a.dateCreated);

    setPosts(postsData);
  };

  console.log({ posts });

  useEffect(() => {
    // if (user?.id) {
    fetchPosts();
    // }
  }, [user]);

  // useEffect(() => {
  //   let unsubscribe;
  //   if (posts) {
  //     unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
  //       snapshot.docChanges().forEach((change) => {
  //         if (change.type === "added") {
  //           console.log({ change });
  //         }
  //       });
  //     });
  //   }

  //   return () => unsubscribe && unsubscribe();
  // }, [posts]);

  return (
    <div className="flex justify-center w-full max-w-[500px]">
      {!posts ? (
        <Skeleton
          count={3}
          height={500}
          width={350}
          className="mb-5 text-red-primary"
        />
      ) : following?.length === 0 ? (
        <p className="flex justify-center font-bold">
          Follow other people to see Photos
        </p>
      ) : posts ? (
        <ul className="w-full">
          {posts.map((p) => (
            <Post key={p.id} data={p} />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Timeline;
