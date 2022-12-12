/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import { doc, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";

import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

import { DEFAULT_IMAGE_PATH } from "../../constants";
import { db, storage } from "../../lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";

const Picture = ({ id, currentUserId, fullName, profilePicture }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const setProfilePicture = async (url) => {
    const userRef = doc(db, "users", currentUserId);

    await updateDoc(userRef, {
      profilePicture: url,
    });
  };

  const uploadProfilePicture = async () => {
    if (!file) return toast.error("please select a image first");

    setUploading(true);

    const toastId = toast.loading("uploading your post, wait a minute...");
    const pictureName = `profile-pictures/${uuidv4()}-${file.name}`;

    const storageRef = ref(storage, pictureName);

    try {
      const uploadTask = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(uploadTask.ref);

      await setProfilePicture(url);

      toast.success("image has uploaded", {
        id: toastId,
      });
    } catch (error) {
      toast.error(error.message, {
        id: toastId,
      });
    } finally {
      setFile("");
      setUploading(false);
    }
  };

  useEffect(() => {
    const reader = new FileReader();

    const handleEvent = (e) => {
      switch (e.type) {
        case "load":
          uploadProfilePicture();
          return;
        case "error":
          return toast.error(e);
        default:
          return;
      }
    };

    if (file) {
      reader.addEventListener("load", handleEvent);
      reader.addEventListener("error", handleEvent);
      reader.readAsDataURL(file);
    }

    return () => {
      reader.removeEventListener("load", handleEvent);
      reader.removeEventListener("error", handleEvent);
    };
  }, [file]);

  return (
    <div className="relative flex flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 md:h-36 md:w-36">
      {uploading ? (
        <Skeleton containerClassName="w-full h-full" height={"100%"} circle />
      ) : (
        <>
          <Image
            className="object-cover w-full rounded-full !relative"
            fill
            alt={`${fullName} profile picture`}
            src={profilePicture ?? DEFAULT_IMAGE_PATH}
          />

          <>
            {id === currentUserId ? (
              <>
                <label
                  htmlFor="profilePicture"
                  className="absolute inset-0 bottom-[-20%] flex justify-center items-end text-xs text-center text-gray-base cursor-pointer"
                >
                  <span className="hidden md:inline-block">
                    Change profile picture
                  </span>
                  <span className="inline-block md:hidden">Change</span>
                </label>

                <input
                  type="file"
                  id="profilePicture"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept="image/png, image/gif, image/jpeg"
                />
              </>
            ) : null}
          </>
        </>
      )}
    </div>
  );
};

export default Picture;
