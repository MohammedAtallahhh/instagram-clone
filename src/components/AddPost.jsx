import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import toast from "react-hot-toast";

import { db, storage } from "../lib/firebase";
import { GlobalContext } from "../context/globalContext";

import { CgAddR } from "react-icons/cg";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const classes = {
  container:
    "fixed inset-0 z-50 flex justify-center items-center bg-black-faded",
  modal:
    "w-[90%] max-w-[700px] h-[500px] flex flex-col justify-center items-center gap-5 bg-white border border-gray-light p-4 rounded-lg ",
  caption:
    "w-full px-2 py-4 border border-gray-light rounded outline-none  focus:border-gray-base focus:bg-gray-background",

  btn: "bg-blue-medium font-bold text-sm rounded text-white px-3 py-2 cursor-pointer",
};

const AddPost = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);

  const [media, setMedia] = useState({
    src: "",
    isUploading: false,
    caption: "",
  });

  const currentImage = useRef(null);

  const {
    state: { user },
  } = useContext(GlobalContext);

  const router = useRouter();

  useEffect(() => {
    const reader = new FileReader();

    const handleEvent = (e) => {
      switch (e.type) {
        case "load":
          return setMedia((prev) => ({
            ...prev,
            src: reader.result,
          }));
        case "error":
          console.log(e);
          return toast.error("something not working");
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

  const handleRemovePost = () => {
    setFile("");
    currentImage.current.src = "";
  };

  const handlePostMedia = async (url) => {
    const postId = uuidv4();
    const postRef = doc(db, "posts", postId);

    const post = {
      id: postId,
      imageSrc: url,
      caption: media.caption,
      user_id: user.id,
      likes: [],
      comments: [],
      dateCreated: serverTimestamp(),
    };

    try {
      await setDoc(postRef, post);
    } catch (error) {
      console.error(error);
      toast.error("error posting the image");
    }
  };

  const handleUploadPost = async () => {
    if (!file) return toast.error("please select a image first");

    setMedia((prev) => ({ ...prev, isUploading: true }));

    const toastId = toast.loading("uploading your post, wait a minute...");
    const postName = `posts/${uuidv4()}-${file.name}`;

    const storageRef = ref(storage, postName);

    try {
      const uploadTask = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(uploadTask.ref);
      await handlePostMedia(url);
      toast.success("image has uploaded", {
        id: toastId,
      });
    } catch (error) {
      console.log({ error });
      toast.error("failed to upload the image", {
        id: toastId,
      });
    } finally {
      setMedia({
        src: "",
        isUploading: false,
        caption: "",
      });
      setFile("");
      setShowModal(false);
      router.reload(window.location.pathname);
    }
  };

  const { container, modal, caption, btn } = classes;

  return (
    <>
      <button name="add post" onClick={() => setShowModal(true)}>
        <CgAddR size={32} />
      </button>
      {showModal ? (
        <div
          className={container}
          onClick={(e) => {
            !e.target.closest("#modal") && setShowModal(false);
          }}
        >
          {/* Close button */}
          <IoMdClose
            size={40}
            color={"white"}
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => setShowModal(false)}
          />

          <div
            id="modal"
            className={`${modal} ${
              media.isUploading ? "opacity-75 pointer-events-none" : ""
            }`}
          >
            {!file ? (
              <>
                <MdOutlineAddPhotoAlternate size={100} color={"#777"} />

                <label htmlFor="photo" className={btn}>
                  Select from computer
                </label>

                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  name="photo"
                  id="photo"
                  className="hidden"
                  multiple={false}
                />
              </>
            ) : (
              <div className="flex flex-col p-5 gap-y-4">
                {/* Uploaded Image */}
                <input
                  type="image"
                  src={media.src}
                  className="w-80 h-80 object-contain"
                  ref={currentImage}
                />

                {/* Caption input */}
                <input
                  type="text"
                  name="caption"
                  id="caption"
                  placeholder="Type your caption (optional...)"
                  onChange={(e) =>
                    setMedia((prev) => ({ ...prev, caption: e.target.value }))
                  }
                  value={media.caption}
                  className={caption}
                />

                {/* Actions  */}
                <div className="flex items-center justify-center w-full gap-x-6">
                  <button
                    name="upload"
                    className={btn}
                    onClick={handleUploadPost}
                    disabled={media.isUploading}
                  >
                    Upload
                  </button>
                  <button
                    name="remove"
                    className="text-red-primary font-bold text-sm rounded px-3 py-2 cursor-pointer"
                    onClick={handleRemovePost}
                    disabled={media.isUploading}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddPost;
