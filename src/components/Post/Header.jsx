/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useContext } from "react";
import { DEFAULT_IMAGE_PATH } from "../../constants";

import { RiDeleteBin7Line } from "react-icons/ri";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../lib/firebase";
import { GlobalContext } from "../../context/globalContext";
import { deleteObject, ref } from "firebase/storage";

const Header = ({ postId, userId, userImage, fullName, imageSrc }) => {
  const {
    state: { user },
  } = useContext(GlobalContext);

  const handleDeletePost = async () => {
    const postRef = doc(db, "posts", postId);
    const postImageRef = ref(storage, imageSrc);

    await deleteDoc(postRef);

    deleteObject(postImageRef).catch((error) => {
      console.log({ error });
    });
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-primary p-2 text-sm">
      <div className="flex items-center">
        <Link href={`/p/${userId}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3 object-cover"
            src={userImage ?? DEFAULT_IMAGE_PATH}
            alt={`${fullName} profile picture`}
          />
          <p className="font-medium">{fullName}</p>
        </Link>
      </div>

      {userId === user?.id ? (
        <div>
          <button
            name="delete post"
            className="bg-red-primary font-medium rounded-full text-white p-2"
            onClick={handleDeletePost}
          >
            <RiDeleteBin7Line size={16} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
