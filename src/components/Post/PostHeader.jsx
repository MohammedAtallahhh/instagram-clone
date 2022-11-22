/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { DEFAULT_IMAGE_PATH } from "../../constants";

const PostHeader = ({ username, auth_id }) => {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link href={`/p/${auth_id}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={DEFAULT_IMAGE_PATH}
            alt={`${username} profile picture`}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
};

export default PostHeader;
