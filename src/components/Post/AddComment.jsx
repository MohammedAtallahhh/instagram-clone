import { arrayUnion, doc, documentId, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { GlobalContext } from "../../context/globalContext";
import { db } from "../../lib/firebase";

const AddComment = ({ id, commentInput }) => {
  const [comment, setComment] = useState("");

  const {
    state: { user },
  } = useContext(GlobalContext);

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    if (!comment.length) {
      toast.error(`comments can't be empty!`);
      return;
    }

    const postRef = doc(db, "posts", id);

    await updateDoc(postRef, {
      comments: arrayUnion({
        content: comment,
        user_id: user.id,
        dateCreated: new Date(),
        id: (Date.now() * 1e9).toString(32),
      }),
    });

    setComment("");
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={handleSubmitComment}
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;
