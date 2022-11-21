/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import Link from "next/link";

import Skeleton from "react-loading-skeleton";

import { GlobalContext } from "../../context/globalContext";
import { DEFAULT_IMAGE_PATH } from "../../constants";

const CurrentUser = () => {
  const {
    state: { user },
  } = useContext(GlobalContext);

  const { auth_id, username, fullName } = user;

  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      href={`/p/${auth_id}`}
      className="grid grid-cols-4 gap-4 mb-3 pb-3 items-center border-b border-gray-light"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-14 flex mr-3"
          src={`/images/${username}/profile.jpg`}
          alt=""
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
};

export default CurrentUser;
