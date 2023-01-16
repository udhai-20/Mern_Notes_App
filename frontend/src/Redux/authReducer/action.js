import axios from "axios";
import * as types from "./actiontype";
import { api } from "../../Component/utils/apilnk";
import { saveData } from "../../Component/utils/localStorage";
import { NavLink, useNavigate } from "react-router-dom";
import ErrorPopup from "../../Component/Error/ErrorPopup";

export const login_post_req = () => ({
  type: types.LOGIN_POST_REQ,
});
export const login_post_succ = (payload) => ({
  type: types.LOGIN_POST_SUCCESS,
  payload,
});

export const login_post_failure = () => ({
  type: types.LOGIN_POST_FAILURE,
});
//register
export const register_post_req = () => ({
  type: types.SIGNUP_POST_REQ,
});
export const register_post_succ = (payload) => ({
  type: types.SIGNUP_POST_SUCCESS,
  payload,
});

export const register_post_failure = () => ({
  type: types.SIGNUP_POST_FAILURE,
});

export const login_user = (payload) => (dispatch) => {
  dispatch(login_post_req());
  return axios
    .post(`${api}/user/login`, payload)
    .then((res) => {
      dispatch(login_post_succ(res.data));
      let datas = res.data;
      return datas;
    })
    .then((res) => {
      console.log(res);
      // alert("login Success");

      alert("Login Successfully");
      return res;
    })
    .catch((err) => {
      console.log("err", err);
      dispatch(login_post_failure());
      alert(err.response.data);
      return err;
      // return <Popup info={true} />;
    });
};
export const register = (payload) => (dispatch) => {
  // const navigate = useNavigate();
  dispatch(register_post_req());
  return axios
    .post(`${api}/user/post`, payload)
    .then((res) => {
      console.log(res.data);
      dispatch(register_post_succ(res.data.message));
      alert("Register Successfully");
      return res;
    })
    .catch((err) => {
      dispatch(register_post_failure());
      console.log("err", err);
      alert(err.response.data);
      return err;
    });
};
