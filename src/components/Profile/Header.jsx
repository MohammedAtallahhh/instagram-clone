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
    <div className="flex justify-center gap-5 md:gap-10 lg:gap-20 border-b border-gray-light pb-24">
      {/* Header image */}
      <Picture
        fullName={fullName}
        profilePicture={profilePicture}
        id={id}
        currentUserId={currentUser?.id}
      />

      {/* Header info */}
      <div className="flex flex-col lg:pt-5">
        <div className="container flex items-center">
          {/* Username */}
          <h2 className="text-2xl lg:text-3xl text-gray-text font-normal mr-5">
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
