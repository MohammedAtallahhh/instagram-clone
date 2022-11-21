import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getUserById } from "../../herlpers/firebase";

import Skeleton from "react-loading-skeleton";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../lib/firebase";

const UserPage = () => {
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { id } = router.query;

      const q = query(collection(db, "users"));

      const data = await getDocs(q);

      const ids = data.docs.map((d) => d.data().auth_id);

      const isValidId = ids.find((existedId) => existedId === id);

      if (isValidId) {
        const userData = await getUserById(id);
        setUser(userData);
      } else {
        router.push("/404");
      }
    };
    fetchUser();
  }, [router]);

  return user ? <div>UserPage: {user.username}</div> : null;
};

export default UserPage;
