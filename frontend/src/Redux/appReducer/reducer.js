import { getData } from "../../Component/utils/localStorage";
import * as types from "./actiontype";
const initial = {
  notes: [],
  isLoading: false,
  isError: false,
};

const reducer = (state = initial, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.NOTES_GET_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case types.NOTES_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notes: payload,
      };
    case types.NOTES_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        notes: [],
        isError: true,
      };
    //patch
    case types.NOTES_PUT_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case types.NOTES_PUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notes: payload,
      };
    case types.NOTES_PUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        notes: [],
        isError: true,
      };
    //delete
    case types.NOTES_DELETE_REQ:
      return {
        ...state,
        isLoading: true,
      };
    case types.NOTES_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.NOTES_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        notes: [],
        isError: true,
      };
    default:
      return state;
  }
};

export { reducer };
