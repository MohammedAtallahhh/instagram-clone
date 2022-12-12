import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";

import { AnimatePage, ProfileHeader, ProfilePhotos } from "../../components";

import { db } from "../../lib/firebase";
import { getPostsByUserId } from "../../herlpers/firebase";

const UserPage = ({ userData }) => {
  const [user, setUser] = useState(userData);
  const [posts, setPosts] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPostsByUserId(user.id);

      setPosts(postsData);
    };

    fetchPosts();
  }, [user.id]);

  useEffect(() => {
    if (userData) {
      const un = onSnapshot(doc(db, "users", userData.id), (newUser) => {
        setUser({ ...newUser.data(), id: newUser.id });
      });

      return () => un();
    }
  }, [userData]);

  useEffect(() => {
    if (!userData) {
      router.push("/404");
    }
  }, [router, userData]);
  return (
    <>
      <Head>
        <title>{user?.fullName}</title>
      </Head>
      <AnimatePage>
        <div className="w-[90%] max-w-[800px] mx-auto">
          <ProfileHeader user={user} posts={posts} />
          <ProfilePhotos posts={posts} />
        </div>
      </AnimatePage>
    </>
  );
};

export const getServerSideProps = async ({ query: { id } }) => {
  const userRef = doc(db, "users", id);
  const userRes = await getDoc(userRef);

  const q = query(collection(db, "users"));

  const usersRes = await getDocs(q);

  const ids = usersRes.docs.map((d) => d.id);

  const isValidId = ids.find((existedId) => existedId === id);

  if (isValidId) {
    return {
      props: {
        userData: { ...userRes.data(), id: userRes.id },
      },
    };
  } else {
    return {
      props: {
        userData: null,
      },
    };
  }
};

export default UserPage;
