import { Suspense, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { Sidebar } from "../components";

import { GlobalContext } from "../context/globalContext";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../lib/firebase";

const Timeline = dynamic(() => import("../components/Timeline"), {
  suspense: true,
});

export default function Home({ posts }) {
  const [isMobile, setIsMobile] = useState(true);

  const {
    state: { user },
  } = useContext(GlobalContext);

  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    const handleResize = (e) => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Head>
        <title>Instagram</title>
      </Head>
      <div className="w-[90%] lg:w-[60%] max-w-[800px] mx-auto flex justify-center gap-12">
        <Suspense fallback={<Skeleton count={3} width={300} height={400} />}>
          <Timeline posts={posts} />
        </Suspense>

        {user === undefined || isMobile ? null : user && !isMobile ? (
          <div className="hidden lg:block w-[40%]">
            <Sidebar />
          </div>
        ) : (
          <Skeleton width={300} height={300} />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const postsQuery = query(collection(db, "posts"));
  const res = await getDocs(postsQuery);

  const posts = res.docs
    .map((d) => ({
      ...d.data(),
      dateCreated: JSON.parse(JSON.stringify(d.data().dateCreated)),
      likes: d.data().likes.map((l) => JSON.parse(JSON.stringify(l))),
      comments: d.data().comments.map((c) => JSON.parse(JSON.stringify(c))),
    }))
    .sort((a, b) => b.dateCreated - a.dateCreated);

  return {
    props: {
      posts,
    },
  };
};
