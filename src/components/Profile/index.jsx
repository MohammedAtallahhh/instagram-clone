import React, { useEffect, useState } from "react";
import { getPostsByUserId } from "../../herlpers/firebase";
import ProfileHeader from "./ProfileHeader";

const Profile = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPostsByUserId(user.id);

      setPosts(postsData);
    };

    fetchPosts();
  }, [user.id]);

  return (
    <div className="w-[90%] max-w-[800px] mx-auto">
      <ProfileHeader user={user} posts={posts} />
    </div>
  );
};

export default Profile;
