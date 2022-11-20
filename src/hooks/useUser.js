import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";

export default function useUser(userId) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async (id) => {
      if (!id) return;
      const q = query(collection(db, "users"), where("id", "==", id));

      const result = await getDocs(q);

      setUser(result.docs[0].data());
    };

    fetchUser(userId);
  }, [userId]);

  return user;
}
