/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";

import Picture from "./Picture";
import Stats from "./Stats";
import FollowButton from "./FollowButton";

import { GlobalContext } from "../../context/globalContext";

const ProfileHeader = ({ user, posts }) => {
  const { id, username, fullName, followers, following, profilePicture } = user;

  const {
    state: { user: currentUser },
  } = useContext(GlobalContext);

  return (
    <div className="flex justify-center gap-5 pb-24 border-b sm:gap-10 lg:gap-20 border-gray-light">
      {/* Header image */}
      <Picture
        fullName={fullName}
        profilePicture={profilePicture}
        id={id}
        currentUserId={currentUser?.id}
      />

      {/* Header info */}
      <div className="flex flex-col md:pt-5">
        <div className="container flex items-center lg:mb-3">
          {/* Username */}
          <h2 className="mr-5 text-2xl font-normal sm:text-3xl lg:text-4xl text-gray-text">
            {username}
          </h2>

          {/* Follow Button */}
          <FollowButton userId={id} />
        </div>

        <Stats
          posts={posts?.length}
          followers={followers?.length}
          following={following?.length}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
