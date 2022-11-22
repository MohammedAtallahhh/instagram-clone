import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { GlobalContext } from "../../context/globalContext";
import CurrentUser from "./CurrentUser";
import SuggestedUsers from "./SuggestedUsers";

const Sidebar = () => {
  const {
    state: { user },
  } = useContext(GlobalContext);

  return user ? (
    <div>
      <CurrentUser />
      <SuggestedUsers />
    </div>
  ) : null;
};

export default Sidebar;
