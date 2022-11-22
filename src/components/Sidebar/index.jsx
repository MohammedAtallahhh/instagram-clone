import React, { useContext } from "react";

import CurrentUser from "./CurrentUser";
import SuggestedUsers from "./SuggestedUsers";

import { GlobalContext } from "../../context/globalContext";

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
