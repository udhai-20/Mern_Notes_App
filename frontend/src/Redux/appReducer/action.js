import * as types from "./actiontype";
import { api } from "../../Component/utils/apilnk";
import axios from "axios";
import { getData } from "../../Component/utils/localStorage";
export const note_get_req = () => ({
  type: types.NOTES_GET_REQ,
});
export const note_get_succ = (payload) => ({
  type: types.NOTES_GET_SUCCESS,
  payload,
});
export const note_get_failure = () => ({
  type: types.NOTES_GET_FAILURE,
});
//post req
export const note_post_req = () => ({
  type: types.NOTES_POST_REQ,
});
export const note_post_succ = (payload) => ({
  type: types.NOTES_POST_SUCCESS,
  payload,
});
export const note_post_failure = () => ({
  type: types.NOTES_POST_FAILURE,
});
//put req
export const note_put_req = () => ({
  type: types.NOTES_PUT_REQ,
});
export const note_put_succ = (payload) => ({
  type: types.NOTES_PUT_SUCCESS,
  payload,
});
export const note_put_failure = () => ({
  type: types.NOTES_PUT_FAILURE,
});
//delete req
export const note_delete_req = () => ({
  type: types.NOTES_DELETE_REQ,
});
export const note_delete_succ = (payload) => ({
  type: types.NOTES_DELETE_SUCCESS,
  payload,
});
export const note_delete_failure = () => ({
  type: types.NOTES_DELETE_FAILURE,
});
// get req

//get req
export const notes_Get_Req = () => (dispatch) => {
  let token = getData("token");
  console.log("token:", token);
  dispatch(note_get_req());
  axios({
    method: "get",
    baseURL: api,
    url: "/notes/get",
    // data: payload,
    headers: { authorization: `Bearer ${token}` },
  })
    .then((res) => {
      dispatch(note_get_succ(res.data));
      console.log("res", res);
    })
    .catch((err) => {
      dispatch(note_get_failure());
      console.log("err", err);
    });
};
//post_req
export const notes_post_Req = (payload) => (dispatch) => {
  let token = getData("token");
  dispatch(note_post_req());
  axios({
    method: "post",
    baseURL: api,
    url: "/notes/create",
    data: payload,
    headers: { authorization: `Bearer ${token}` },
  })
    .then((res) => {
      dispatch(note_post_succ(res.data));
      dispatch(notes_Get_Req());
      console.log("res", res);
    })
    .catch((err) => {
      dispatch(note_post_failure());
      console.log("err", err);
    });
};
//put request
export const notes_put_Req = (id, payload) => (dispatch) => {
  let token = getData("token");
  dispatch(note_put_req());
  axios({
    method: "patch",
    baseURL: api,
    url: `/notes/${id}`,
    data: payload,
    headers: { authorization: `Bearer ${token}` },
  })
    .then((res) => {
      dispatch(note_put_succ(res.data));
      dispatch(notes_Get_Req());
      console.log("res", res);
    })
    .catch((err) => {
      dispatch(note_put_failure());
      console.log("err", err);
    });
};

//deleet req

export const notes_delete_Req = (id) => (dispatch) => {
  let token = getData("token");
  dispatch(note_delete_req());
  axios({
    method: "delete",
    baseURL: api,
    url: `/notes/${id}`,
    headers: { authorization: `Bearer ${token}` },
  })
    .then((res) => {
      dispatch(note_delete_succ());
      dispatch(notes_Get_Req());
      console.log("res", res);
    })
    .catch((err) => {
      dispatch(note_delete_failure());
      console.log("err", err);
    });
};
