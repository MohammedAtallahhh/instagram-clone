import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { Sidebar, Timeline } from "../components";
import { GlobalContext } from "../context/globalContext";
import Skeleton from "react-loading-skeleton";

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
    <div className="w-[90%] max-w-[800px] mx-auto flex gap-12">
      <div className="lg:w-[60%] max-w-[450px] mx-auto">
        <Timeline />
      </div>

      {user === undefined ? null : user === null ? (
        <Skeleton width={300} height={400} />
      ) : (
        <div className="hidden lg:block w-[40%]">
          <Sidebar />
        </div>
      )}
    </div>
  );
}
