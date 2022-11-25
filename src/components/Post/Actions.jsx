import React, { useContext } from "react";

import { GlobalContext } from "../../context/globalContext";

import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const Actions = ({
  userId,
  handleFocus,
  likes,
  liked,
  liking,
  handleToggleLiked,
}) => {
  const {
    state: { user },
  } = useContext(GlobalContext);

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-4 py-2">
          <button
            name="like post"
            onClick={() => handleToggleLiked(userId)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleToggleLiked(userId);
              }
            }}
            disabled={liking}
          >
            {liking ? (
              <ImSpinner2 size={26} className="text-red-primary animate-spin" />
            ) : liked === false ? (
              <BsHeart size={26} />
            ) : (
              <BsFillHeartFill size={26} className="text-red-primary" />
            )}
          </button>

          <button
            name="add comment to post"
            onClick={handleFocus}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleFocus();
              }
            }}
          >
            <FaRegCommentDots size={26} />
          </button>
        </div>
      ) : null}

      <div className="pb-2">
        <p className="font-medium">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </div>
  );
};

export default Actions;
