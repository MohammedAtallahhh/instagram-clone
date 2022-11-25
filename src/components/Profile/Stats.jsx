import React from "react";
import Skeleton from "react-loading-skeleton";

const Stats = ({ posts, followers, following }) => {
  return (
    <div className="flex mt-4">
      <div className="flex gap-5 lg:gap-10">
        <p className="flex items-center gap-1 text-sm lg:text-base">
          <span className="font-medium">{posts} </span>
          <span className="text-gray-text">Photos</span>
        </p>
        <p className="flex items-center gap-1 text-sm lg:text-base">
          <span className="font-medium">{followers} </span>
          <span className="text-gray-text">
            {followers.length === 1 ? `follower` : `followers`}
          </span>
        </p>
        <p className="flex items-center gap-1 text-sm lg:text-base">
          <span className="font-medium">{following} </span>
          <span className="text-gray-text">following</span>
        </p>
      </div>
    </div>
  );
};

export default Stats;
