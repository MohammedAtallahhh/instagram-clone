/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from "react";
import Link from "next/link";
import { GlobalContext } from "../../context/globalContext";
import { followUser } from "../../herlpers/firebase";

const SuggestedUser = ({ profileData }) => {
  const [followed, setFollowed] = useState(false);

  const {
    data: { username },
    docId: id,
  } = profileData;

  const {
    state: { user },
    dispatch,
  } = useContext(GlobalContext);

  async function handleFollowUser() {
    setFollowed(true);
    await followUser(user.docId, id);
  }

  return !followed ? (
    <div className="flex flex-row items-center justify-between py-2">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/default.png`}
          alt=""
        />
        <Link href={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
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
