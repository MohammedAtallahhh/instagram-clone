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

import { Profile } from "../../components";

import { db } from "../../lib/firebase";

const UserPage = ({ userData }) => {
  const [user, setUser] = useState(userData);

  const router = useRouter();

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
  return user ? (
    <>
      <Head>
        <title>{user.fullName}</title>
      </Head>
      <div className="w-[90%] max-w-[800px] mx-auto">
        <Profile user={user} />
      </div>
    </>
  ) : null;
};

export const getServerSideProps = async ({ query: { id } }) => {
  const userRef = doc(db, "users", id);
  const userRes = await getDoc(userRef);

  const q = query(collection(db, "users"));

  const postsRes = await getDocs(q);

  const ids = postsRes.docs.map((d) => d.id);

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
