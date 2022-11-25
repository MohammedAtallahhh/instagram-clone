/* eslint-disable @next/next/no-img-element */
import React from "react";

import Skeleton from "react-loading-skeleton";

import { BsFillHeartFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import Link from "next/link";

const Photos = ({ posts }) => {
  return (
    <div>
      <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 pb-20">
        {!posts
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  containerClassName="max-container"
                  height={200}
                />
              ))
          : posts.length
          ? posts.map((photo) => (
              // <Link key={photo.id} href={`/post/${photo.id}`}>
              <div
                key={photo.id}
                className="relative flex justify-center items-center w-full max-w-[320px] group"
              >
                <img src={photo.imageSrc} alt={photo.caption} />

                <div className="absolute inset-0 z-10 w-full flex justify-evenly items-center bg-black-faded invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all">
                  <p className="flex items-center gap-1 text-white font-bold">
                    <BsFillHeartFill size={24} color="#ed4956" />
                    {photo.likes.length}
                  </p>

                  <p className="flex items-center gap-1 text-white font-bold">
                    <FaCommentDots size={24} color="#eee" />
                    {photo.comments.length}
                  </p>
                </div>
              </div>
              // </Link>
            ))
          : null}
      </div>

      {!posts ||
        (posts.length === 0 && (
          <p className="text-center text-2xl">No Posts Yet</p>
        ))}
    </div>
  );
};

export default Photos;
