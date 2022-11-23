/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useContext } from "react";
import { DEFAULT_IMAGE_PATH } from "../../constants";

import { RiDeleteBin7Line } from "react-icons/ri";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { GlobalContext } from "../../context/globalContext";

const Header = ({ postId, userId, username, auth_id }) => {
  const {
    state: { user },
  } = useContext(GlobalContext);

  const handleDeletePost = async () => {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link href={`/p/${auth_id}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={DEFAULT_IMAGE_PATH}
            alt={`${username} profile picture`}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>

      {userId === user?.id ? (
        <div>
          <button
            className="bg-red-primary font-medium rounded-full text-white p-2"
            onClick={handleDeletePost}
          >
            <RiDeleteBin7Line size={20} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
