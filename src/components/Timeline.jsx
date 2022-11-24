import React, { useContext } from "react";

import Skeleton from "react-loading-skeleton";

import Post from "./Post";

import { GlobalContext } from "../context/globalContext";

const Timeline = ({ posts }) => {
  const {
    state: { user },
  } = useContext(GlobalContext);

  const following = user?.following;

  return (
    <div className="w-[100%] lg:w-[60%] max-w-[400px] mx-auto flex justify-center">
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
