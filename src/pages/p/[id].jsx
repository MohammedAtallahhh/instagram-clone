import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";

import { Profile } from "../../components";

import { db } from "../../lib/firebase";
import { getUserByAuthId } from "../../herlpers/firebase";

const UserPage = () => {
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    const fetchUser = async () => {
      const q = query(collection(db, "users"));

      const data = await getDocs(q);

      const ids = data.docs.map((d) => d.data().auth_id);

      const isValidId = ids.find((existedId) => existedId === id);

      console.log({ id, ids });

      if (isValidId) {
        const userData = await getUserByAuthId(id);
        setUser(userData);

        onSnapshot(doc(db, "users", userData.id), (newUser) => {
          setUser({ ...newUser.data(), id: newUser.id });
        });
      } else {
        router.push("/404");
      }
    };
    if (id) {
      fetchUser();
    }
  }, [router]);

  return user ? (
    <div>
      <Profile user={user} />
    </div>
  ) : null;
};

export default UserPage;
