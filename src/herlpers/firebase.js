import {
  arrayUnion,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export const usernameExists = async (username) => {
  const q = query(
    collection(db, "users"),
    where("username", "==", username.toLowerCase())
  );

  const snap = await getDocs(q);
  return !snap.empty;
};

export const getUserByAuthId = async (id) => {
  if (!id) return;

  const q = query(collection(db, "users"), where("auth_id", "==", id));

  const result = await getDocs(q);

  const user = result.docs[0].data();

  return { id: result.docs[0].id, ...user };
};

export const followUser = async (currentUserId, followedUserId) => {
  const currentUserRef = doc(db, "users", currentUserId);
  const followedUserRef = doc(db, "users", followedUserId);

  await updateDoc(currentUserRef, {
    following: arrayUnion(followedUserId),
  });

  await updateDoc(followedUserRef, {
    followers: arrayUnion(currentUserId),
  });
};
