import React, { useContext } from "react";

import CurrentUser from "./CurrentUser";
import SuggestedUsers from "./SuggestedUsers";

import { GlobalContext } from "../../context/globalContext";
import Skeleton from "react-loading-skeleton";

const Sidebar = () => {
  const {
    state: { user },
  } = useContext(GlobalContext);

  return user ? (
    <div>
      <CurrentUser />
      <SuggestedUsers />
    </div>
  ) : (
    <Skeleton width={300} height={400} />
  );
};

export default Sidebar;
