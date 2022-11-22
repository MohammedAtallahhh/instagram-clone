/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";

const Post = ({ data }) => {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  const {
    id,
    imageSrc,
    caption,
    likes,
    userData: { username, auth_id },
  } = data;

  return (
    <div className="max-w-[650px] rounded mb-12 border bg-white border-gray-primary">
      <PostHeader username={username} auth_id={auth_id} />

      <img src={imageSrc} alt={caption} />
      <PostActions
        id={id}
        likesCount={likes.length}
        hasLiked={data.hasLiked}
        handleFocus={handleFocus}
      />
      {/* <Footer caption={content.caption} username={content.username} /> */}
      {/* <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      /> */}
    </div>
  );
};

export default Post;
