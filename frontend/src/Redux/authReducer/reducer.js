import * as types from "./actiontype";
const initial = {
  messsage: null,
  isAuth: null,
  isLoading: false,
  isError: false,
};

export const reducer = (state = initial, action) => {
  const { type, payload } = action;
  console.log("type", type);
  switch (type) {
    case types.SIGNUP_POST_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case types.SIGNUP_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messsage: payload,
      };
    case types.SIGNUP_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        messsage: null,
      };

    //login
    case types.LOGIN_POST_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGIN_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messsage: payload,
        isAuth: true,
      };
    case types.LOGIN_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        messsage: null,
        isAuth: null,
      };
    default:
      return state;
  }
};
