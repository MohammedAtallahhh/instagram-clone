import { formatDistance } from "date-fns";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import { db } from "../../lib/firebase";
import AddComment from "./AddComment";

const Comments = ({ id, comments, dateCreated, commentInput }) => {
  const [commentsData, setCommentsData] = useState(null);
  const [commentsSlice, setCommentsSlice] = useState(3);

  const showNext =
    commentsData?.length >= 3 && commentsSlice < commentsData?.length;

  const hide = commentsSlice >= commentsData?.length;

  const {
    state: { user },
  } = useContext(GlobalContext);

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };

  const hideComments = () => {
    setCommentsSlice(3);
  };

  const handleDeleteComment = async (commentId) => {
    const postRef = doc(db, "posts", id);

    await updateDoc(postRef, {
      comments: comments.filter((c) => c.id !== commentId),
    });
  };

  useEffect(() => {
    if (!comments.length) return;

    const getCommentsData = async () => {
      let data = await Promise.all(
        comments.map(async (c) => {
          const userRef = doc(db, "users", c.user_id);

          const res = await getDoc(userRef);

          return {
            userData: { id: res.id, ...res.data() },
            content: c.content,
            dateCreated: c.dateCreated,
            id: c.id,
          };
        })
      );

      data = data.sort((a, b) => b.dateCreated - a.dateCreated);

      setCommentsData(data);
    };

    getCommentsData();
  }, [comments]);

  return (
    <>
      {comments.length ? (
        <div className="p-4 pt-1 pb-4">
          {/* Comments */}
          {commentsData
            ?.slice(0, commentsSlice)
            .map(({ id, content, userData, dateCreated }, i) => (
              <div key={i + userData.auth_id} className="mb-2">
                {/* Comment */}
                <div className="flex">
                  <Link href={`/p/${userData.auth_id}`}>
                    <h4 className="text-gray-text font-semibold mr-2">
                      {userData.fullName}
                    </h4>
                  </Link>
                  <p>{content}</p>
                </div>

                {/* Comment footer */}
                <div className="text-xs text-gray-base">
                  <span className="mr-3">
                    {formatDistance(dateCreated.seconds * 1000, new Date())} ago
                  </span>

                  {userData.id === user?.id ? (
                    <button
                      className="text-red-base"
                      onClick={() => handleDeleteComment(id)}
                    >
                      delete
                    </button>
                  ) : null}
                </div>
              </div>
            ))}

          {/* button for showing and hiding comments */}
          {commentsData?.length > 3 ? (
            <button
              className="text-sm text-gray-base mt-3 focus:outline-none"
              type="button"
              onClick={
                showNext ? showNextComments : hide ? hideComments : undefined
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  showNext ? showNextComments() : hide ? hideComments() : null;
                }
              }}
            >
              {showNext ? `View more comments` : "Hide comments"}
            </button>
          ) : null}

          {/* Post date  */}
          <p className="text-gray-base uppercase text-[0.7rem] mt-3">
            {formatDistance(dateCreated.seconds * 1000, new Date())} ago
          </p>
        </div>
      ) : null}

      {user ? <AddComment id={id} commentInput={commentInput} /> : null}
    </>
  );
};

export default Comments;
