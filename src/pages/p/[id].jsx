import React, { useEffect, useState } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";

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

  useEffect(() => {
    const un = onSnapshot(doc(db, "users", userData.id), (newUser) => {
      setUser({ ...newUser.data(), id: newUser.id });
    });

    return () => un();
  }, [userData.id]);

  return (
    <>
      <Head>
        <title>{user.fullName}</title>
      </Head>
      <div className="w-[90%] max-w-[800px] mx-auto">
        <Profile user={user} />
      </div>
    </>
  );
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
    Router.push("/404");
  }
};

export default UserPage;
