import React, { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import CurrentUser from "./CurrentUser";
import SuggestedUsers from "./SuggestedUsers";

const Sidebar = () => {
  const {
    state: { user },
  } = useContext(GlobalContext);

  return user ? (
    <div className="w-[220px]">
      <CurrentUser />
      <SuggestedUsers />
    </div>
  ) : null;
};

export default Sidebar;
