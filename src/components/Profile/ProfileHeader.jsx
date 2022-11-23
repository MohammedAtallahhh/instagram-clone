/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { GlobalContext } from "../../context/globalContext";
import { DEFAULT_IMAGE_PATH } from "../../constants";
import { isUserFollowingProfile, ToggleFollow } from "../../herlpers/firebase";

const ProfileHeader = ({ user, posts }) => {
  const { id, username, fullName, followers, following } = user;

  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const [Toggling, setToggling] = useState(false);

  const {
    state: { user: currentUser },
  } = useContext(GlobalContext);

  useEffect(() => {
    setIsCurrentUser(currentUser?.id === id);

    const fetch = async () => {
      const isFollowing = await isUserFollowingProfile(currentUser.id, id);
      setIsFollowingProfile(isFollowing);
    };

    fetch();
  }, [id, currentUser.id]);

  const handleToggleFollow = async () => {
    setToggling(true);
    await ToggleFollow(isFollowingProfile, currentUser.id, id);
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setToggling(false);
  };

  return (
    <div className="flex justify-center gap-5 md:gap-10 lg:gap-20">
      {/* Header image */}
      <div className="flex">
        {id ? (
          <img
            className="rounded-full w-16 h-16 md:w-20 md:h-20 lg:h-36 lg:w-36"
            alt={`${fullName} profile picture`}
            src={DEFAULT_IMAGE_PATH}
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>

      {/* Header info */}
      <div className="flex flex-col lg:pt-5">
        <div className="container flex items-center">
          {/* Username */}
          <h2 className="text-2xl lg:text-3xl text-gray-text font-normal mr-5">
            {username}
          </h2>

          {/* Follow Button */}

          {isCurrentUser ? null : isFollowingProfile === null ? (
            <Skeleton
              count={1}
              width={80}
              height={32}
              className="bg-blue-medium/20"
            />
          ) : (
            <button
              className={`bg-blue-medium font-bold text-sm rounded text-white w-20 h-8 ${
                Toggling ? "opacity-50" : ""
              }`}
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggleFollow();
                }
              }}
              disabled={Toggling}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        {/* User Stats */}
        <div className="flex mt-4">
          {!posts ? (
            <Skeleton count={1} height={40} width={250} />
          ) : (
            <div className="flex gap-5 lg:gap-10">
              <p className="flex items-center gap-1 text-sm lg:text-base">
                <span className="font-medium">{posts.length} </span>
                <span className="text-gray-text">Photos</span>
              </p>
              <p className="flex items-center gap-1 text-sm lg:text-base">
                <span className="font-medium">{followers.length} </span>
                <span className="text-gray-text">
                  {followers.length === 1 ? `follower` : `followers`}
                </span>
              </p>
              <p className="flex items-center gap-1 text-sm lg:text-base">
                <span className="font-medium">{following.length} </span>
                <span className="text-gray-text">following</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
