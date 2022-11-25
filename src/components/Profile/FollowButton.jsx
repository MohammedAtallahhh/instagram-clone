import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/globalContext";

import { isUserFollowingProfile, ToggleFollow } from "../../herlpers/firebase";

const FollowButton = ({ userId }) => {
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const [Toggling, setToggling] = useState(false);

  const {
    state: { user: currentUser },
  } = useContext(GlobalContext);

  useEffect(() => {
    const fetch = async () => {
      setIsCurrentUser(currentUser?.id === userId);
      const isFollowing = await isUserFollowingProfile(currentUser?.id, userId);
      setIsFollowingProfile(isFollowing);
    };

    if (currentUser) {
      fetch();
    }
  }, [userId, currentUser]);

  const handleToggleFollow = async () => {
    setToggling(true);
    await ToggleFollow(isFollowingProfile, currentUser?.id, userId);
    setToggling(false);
  };

  return isCurrentUser ? null : (
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
  );
};

export default FollowButton;
