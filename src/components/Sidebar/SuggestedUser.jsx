/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from "react";
import Link from "next/link";
import { GlobalContext } from "../../context/globalContext";
import { followUser } from "../../herlpers/firebase";
import { DEFAULT_IMAGE_PATH } from "../../constants";

const SuggestedUser = ({ data }) => {
  const [followed, setFollowed] = useState(false);

  const {
    state: { user },
  } = useContext(GlobalContext);

  const handleFollowUser = async () => {
    // send the current user id along with the followed user
    await followUser(user.id, id);
    setFollowed(true);
  };
  const { username, id, auth_id } = data;
  return !followed ? (
    <div className="flex flex-row items-center justify-between py-2">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={DEFAULT_IMAGE_PATH}
          alt=""
        />
        <Link href={`/p/${auth_id}`}>
          <p className="font-bold text-sm text-gray-text">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
};

export default SuggestedUser;
