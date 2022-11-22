import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
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

export const getPostsByUserId = async (id) => {
  const q = query(collection(db, "posts"), where("user_id", "==", id));

  const postsDocs = await getDocs(q);

  const posts = postsDocs.docs.map((p) => ({ ...p.data(), id: p.id }));

  return posts;
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

export const isUserFollowingProfile = async (userId, profileUserId) => {
  const userRef = doc(db, "users", userId);

  const res1 = await getDoc(userRef);
  const userFollowing = res1.data().following;

  return userFollowing.includes(profileUserId);
};

export const ToggleFollow = async (
  isFollowingState,
  currentUserId,
  followedUserId
) => {
  const userRef = doc(db, "users", currentUserId);
  const followedRef = doc(db, "users", followedUserId);

  await updateDoc(userRef, {
    following: isFollowingState
      ? arrayRemove(followedUserId)
      : arrayUnion(followedUserId),
  });

  await updateDoc(followedRef, {
    followers: isFollowingState
      ? arrayRemove(currentUserId)
      : arrayUnion(currentUserId),
  });
};
