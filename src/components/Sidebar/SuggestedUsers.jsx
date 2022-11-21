import { collection, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import { getSuggestedUsers, getUserById } from "../../herlpers/firebase";
import { db } from "../../lib/firebase";
import SuggestedUser from "./SuggestedUser";

import Skeleton from "react-loading-skeleton";

const SuggestedUsers = () => {
  const {
    state: { user },
  } = useContext(GlobalContext);

  const [profiles, setProfiles] = useState([]);

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h2 className="font-medium mb-3">Suggested users</h2>

      {loading ? (
        <Skeleton count={5} height={40} />
      ) : (
        <ul className="max-w-[250px]">
          {profiles.map((profile) => (
            <SuggestedUser key={profile.docId} profileData={profile} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestedUsers;
