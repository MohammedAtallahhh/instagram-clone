import React, { useEffect, useState } from "react";
import { getPostsByUserId } from "../../herlpers/firebase";
import ProfileHeader from "./ProfileHeader";

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
    </div>
  );
};

export default Profile;
