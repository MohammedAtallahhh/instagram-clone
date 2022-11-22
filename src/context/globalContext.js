import { createContext, useEffect, useReducer } from "react";
import { actions } from "./actions";
import { globalReducer } from "./globalReducer";

import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserByAuthId } from "../herlpers/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const GlobalContext = createContext();

const initialState = {
  user: null,
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("CHANGED");
      if (user) {
        const id = user.uid;
        const userData = await getUserByAuthId(id);

        dispatch({ type: actions.LOGIN, payload: userData });

        onSnapshot(doc(db, "users", userData.id), (user) => {
          const data = user.data();

          dispatch({ type: actions.LOGIN, payload: { ...data, id: user.id } });
        });
      }
    });
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
