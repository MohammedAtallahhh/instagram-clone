import React, { useContext, useEffect, useState } from "react";

import CurrentUser from "./CurrentUser";

import { GlobalContext } from "../../context/globalContext";
import SuggestedUser from "./SuggestedUser";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

const Sidebar = () => {
  const {
    state: { user },
  } = useContext(GlobalContext);

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(
        collection(db, "users"),
        where("uid", "not-in", [...user.following, user.id])
      );

      const userDocs = await getDocs(q);

      const users = userDocs.docs.map((u) => ({ id: u.id, ...u.data() }));

      setProfiles(users);
    };

    if (user?.id) {
      fetchUsers();
    }
  }, [user]);

  return (
    <div>
      <CurrentUser />
      {profiles.length ? (
        <div>
          <h2 className="mb-3 font-medium">Suggested users</h2>

          <ul className="max-w-[250px]">
            {profiles.map((profile) => (
              <SuggestedUser key={profile.id} data={profile} />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
