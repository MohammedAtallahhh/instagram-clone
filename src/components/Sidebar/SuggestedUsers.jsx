import {
  collection,
  documentId,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import { db } from "../../lib/firebase";
import SuggestedUser from "./SuggestedUser";

import Skeleton from "react-loading-skeleton";

const SuggestedUsers = () => {
  const {
    state: { user },
  } = useContext(GlobalContext);

  const [profiles, setProfiles] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const q = query(
        collection(db, "users"),
        where(documentId(), "not-in", [...user.following, user.id])
      );

      const userDocs = await getDocs(q);

      const users = userDocs.docs.map((u) => ({ id: u.id, ...u.data() }));

      setLoading(false);
      setProfiles(users);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="font-medium mb-3">Suggested users</h2>

      {loading ? (
        <Skeleton count={5} height={40} />
      ) : (
        <ul className="max-w-[250px]">
          {profiles.map((profile) => (
            <SuggestedUser key={profile.id} data={profile} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestedUsers;
