import { createContext, useEffect, useReducer } from "react";
import { actions } from "./actions";
import { globalReducer } from "./globalReducer";

import { auth, db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const GlobalContext = createContext();

const initialState = {
  user: null,
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: actions.LOGIN, payload: user });
    });
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
