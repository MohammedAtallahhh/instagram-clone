import { actions } from "./actions";

export const globalReducer = (state, action) => {
  console.log({ action });
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case actions.LOGOUT:
      console.log("HERE");
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
