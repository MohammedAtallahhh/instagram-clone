/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { GlobalContext } from "../../context/globalContext";
import { DEFAULT_IMAGE_PATH } from "../../constants";
import { isUserFollowingProfile, ToggleFollow } from "../../herlpers/firebase";
import toast from "react-hot-toast";
import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

const ProfileHeader = ({ user, posts }) => {
  const { id, username, fullName, followers, following, profilePicture } = user;

  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const [Toggling, setToggling] = useState(false);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const {
    state: { user: currentUser },
  } = useContext(GlobalContext);

  useEffect(() => {
    const fetch = async () => {
      setIsCurrentUser(currentUser?.id === id);
      const isFollowing = await isUserFollowingProfile(currentUser?.id, id);
      setIsFollowingProfile(isFollowing);
    };

    if (currentUser) {
      fetch();
    }
  }, [id, currentUser]);

  const handleToggleFollow = async () => {
    setToggling(true);
    await ToggleFollow(isFollowingProfile, currentUser?.id, id);
    setToggling(false);
  };

  const setProfilePicture = async (url) => {
    const userRef = doc(db, "users", currentUser.id);

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

      console.log(url);
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
      // router.reload(window.location.pathname);
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
    <div className="flex justify-center gap-5 md:gap-10 lg:gap-20 border-b border-gray-light pb-24">
      {/* Header image */}
      <div className="flex relative w-16 h-16 md:w-20 md:h-20 lg:h-36 lg:w-36">
        {uploading ? (
          <Skeleton containerClassName="w-full h-full" height={"100%"} circle />
        ) : (
          <>
            <img
              className="object-cover w-full rounded-full"
              alt={`${fullName} profile picture`}
              src={profilePicture ?? DEFAULT_IMAGE_PATH}
            />

            <>
              {id === currentUser?.id ? (
                <>
                  <label
                    htmlFor="profilePicture"
                    className="absolute inset-0 bottom-[-20%] flex justify-center items-end text-xs text-center text-gray-base cursor-pointer"
                  >
                    <span className="hidden lg:inline-block">
                      Change profile picture
                    </span>
                    <span className="inline-block lg:hidden">Change</span>
                  </label>

                  <input
                    type="file"
                    id="profilePicture"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </>
              ) : null}
            </>
          </>
        )}
      </div>

      {/* Header info */}
      <div className="flex flex-col lg:pt-5">
        <div className="container flex items-center">
          {/* Username */}
          <h2 className="text-2xl lg:text-3xl text-gray-text font-normal mr-5">
            {username}
          </h2>

          {/* Follow Button */}

          {isCurrentUser ? null : (
            <button
              className={`bg-blue-medium font-bold text-sm rounded text-white w-20 h-8 ${
                Toggling ? "opacity-50" : ""
              }`}
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggleFollow();
                }
              }}
              disabled={Toggling}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        {/* User Stats */}
        <div className="flex mt-4">
          {!posts ? (
            <Skeleton count={1} height={40} width={250} />
          ) : (
            <div className="flex gap-5 lg:gap-10">
              <p className="flex items-center gap-1 text-sm lg:text-base">
                <span className="font-medium">{posts.length} </span>
                <span className="text-gray-text">Photos</span>
              </p>
              <p className="flex items-center gap-1 text-sm lg:text-base">
                <span className="font-medium">{followers.length} </span>
                <span className="text-gray-text">
                  {followers.length === 1 ? `follower` : `followers`}
                </span>
              </p>
              <p className="flex items-center gap-1 text-sm lg:text-base">
                <span className="font-medium">{following.length} </span>
                <span className="text-gray-text">following</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
