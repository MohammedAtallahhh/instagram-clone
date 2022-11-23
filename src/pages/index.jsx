import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { Sidebar, Timeline } from "../components";
import { GlobalContext } from "../context/globalContext";
import Skeleton from "react-loading-skeleton";
import Head from "next/head";

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
      <div className="w-[90%] max-w-[800px] mx-auto flex gap-12">
        <div className="w-[90%] lg:w-[60%] max-w-[650px] mx-auto flex justify-center">
          <Timeline />
        </div>
        {user ? (
          <div className="hidden lg:block w-[40%]">
            <Sidebar />
          </div>
        ) : null}
      </div>
    </>
  );
}
