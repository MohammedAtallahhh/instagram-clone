/* eslint-disable @next/next/no-img-element */
import React from "react";

import Skeleton from "react-loading-skeleton";

import { BsFillHeartFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import Image from "next/image";

const Photos = ({ posts }) => {
  console.log({ posts });
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 pb-20 mt-12 justify-items-center sm:grid-cols-2 md:grid-cols-3">
        {!posts
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  containerClassName="max-container"
                  height={200}
                  width={200}
                />
              ))
          : posts.length
          ? posts.map((photo) => (
              // <Link key={photo.id} href={`/post/${photo.id}`}>
              <div
                key={photo.id}
                className="relative flex justify-center items-center w-full max-w-[240px] group"
              >
                <Image
                  src={photo.imageSrc}
                  fill
                  className="!relative"
                  alt={photo.caption}
                />

                <div className="absolute inset-0 z-10 flex items-center invisible w-full transition-all opacity-0 justify-evenly bg-black-faded group-hover:visible group-hover:opacity-100">
                  <p className="flex items-center gap-1 font-bold text-white">
                    <BsFillHeartFill size={24} color="#ed4956" />
                    {photo.likes.length}
                  </p>

                  <p className="flex items-center gap-1 font-bold text-white">
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
          <p className="text-2xl text-center">No Posts Yet</p>
        ))}
    </div>
  );
};

export default Photos;
