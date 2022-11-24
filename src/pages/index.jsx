import { Suspense, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { Sidebar } from "../components";

import { GlobalContext } from "../context/globalContext";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";

const Timeline = dynamic(() => import("../components/Timeline"), {
  suspense: true,
});

export default function Home() {
  const {
    state: { user },
  } = useContext(GlobalContext);

  // const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/login");
  //   }
  // }, [user, router]);

  return (
    <>
      <Head>
        <title>Instagram</title>
      </Head>
      <div className="w-[90%] lg:w-[60%] max-w-[800px] mx-auto flex justify-center gap-12">
        {/* <div className="w-[90%] lg:w-[60%] max-w-[650px] mx-auto flex justify-center"> */}
        <Suspense fallback={<Skeleton count={3} width={300} height={400} />}>
          <Timeline />
        </Suspense>
        {/* </div> */}
        {user ? (
          <div className="hidden lg:block w-[40%]">
            <Sidebar />
          </div>
        ) : null}
      </div>
    </>
  );
}
