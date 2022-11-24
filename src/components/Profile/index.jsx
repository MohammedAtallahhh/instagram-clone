/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import Skeleton from "react-loading-skeleton";
import ProfileHeader from "./ProfileHeader";

import { getPostsByUserId } from "../../herlpers/firebase";

import { BsFillHeartFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import Link from "next/link";

const Profile = ({ user }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPostsByUserId(user.id);

      setPosts(postsData);
    };

    fetchPosts();
  }, [user.id]);

  return (
    <div>
      <ProfileHeader user={user} posts={posts} />
      <div>
        <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
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
                <Link key={photo.id} href={`/post/${photo.id}`}>
                  <div className="relative max-w-[320px] group cursor-pointer">
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
                </Link>
              ))
            : null}
        </div>

        {!posts ||
          (posts.length === 0 && (
            <p className="text-center text-2xl">No Posts Yet</p>
          ))}
      </div>
    </div>
  );
};

export default Profile;
