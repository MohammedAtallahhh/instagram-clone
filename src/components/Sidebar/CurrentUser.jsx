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

  const { id, username, fullName } = user;

  return (
    <Link
      href={`/p/${id}`}
      className="flex gap-4 mb-3 pb-3 items-center border-b border-gray-light"
    >
      <div className="flex items-center justify-between flex-shrink-0">
        <img
          className="rounded-full w-14 h-14 object-cover flex mr-3"
          src={user?.profilePicture ?? DEFAULT_IMAGE_PATH}
          alt=""
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm text-gray-text">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
};

export default CurrentUser;
