import { createContext, useEffect, useReducer } from "react";
import { actions } from "./actions";
import { globalReducer } from "./globalReducer";

import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserById } from "../herlpers/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const GlobalContext = createContext();

const initialState = {
  user: null,
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const id = user.uid;
        const userData = await getUserById(id);

        dispatch({ type: actions.LOGIN, payload: userData });
      } else {
        dispatch({ type: actions.LOGOUT });
      }
    });
  }, []);

  useEffect(() => {
    if (state.user) {
      const unsub = onSnapshot(doc(db, "users", state.user.id), (user) => {
        const data = user.data();

        dispatch({ type: actions.LOGIN, payload: { ...data, id: user.id } });
      });

      return () => unsub();
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
