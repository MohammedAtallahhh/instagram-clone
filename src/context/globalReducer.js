import { actions } from "./actions";

export const globalReducer = (state, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case actions.LOGOUT:
      return {
        ...state,
        user: undefined,
      };

    default:
      return state;
  }
};
