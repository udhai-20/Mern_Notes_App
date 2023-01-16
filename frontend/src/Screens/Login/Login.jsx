import React, { useState } from "react";
import NoteTitle from "../../Component/Notes/NoteTitle";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { login_user } from "../../Redux/authReducer/action";
import ErrorPopup from "../../Component/Error/ErrorPopup";
import AlertPopup from "../../Component/Error/AlertPopup";
import { saveData } from "../../Component/utils/localStorage";
let initial = {
  email: "",
  password: "",
  pic: "",
};
function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [show, setShow] = useState(false);
  const [confirmPassword, setCOnfirmPass] = useState("");
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState(false);
  const [picMessage, setPicMessage] = useState(null);

  const { email, password, pic } = form;
  const { loading, error, auth, messsage } = useSelector((state) => {
    return {
      loading: state.authReducer.isLoading,
      error: state.authReducer.isError,
      auth: state.authReducer.isAuth,
      messsage: state.authReducer.messsage,
    };
  }, shallowEqual);
  console.log("loading:", loading);
  console.log("auth:", auth);
  console.log("messsage:", messsage);
  console.log("error:", error);
  const handelCatch = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(" confirmPassword:", confirmPassword, password);
    if (password != confirmPassword) {
      setAlert(true);
    } else {
      setAlert(false);
      if (email != "" || password != "" || confirmPassword != "") {
        let payload = {
          email,
          password,
          pic,
        };
        dispatch(login_user(payload))
          .then((res) => {
            if (res.token) {
              console.log("login_req", res.token);
              saveData("token", res.token);
              saveData("name", res.name);
              setSuccess(true);
              setShow(true);
              navigate("/mynotes");
            }
          })
          .catch((err) => {
            setSuccess(false);
            console.log(err);
          });
        console.log(form);
      } else {
        alert("please enter all details");
      }
    }
  };

  return (
    <NoteTitle title="LOGIN">
      <div className="loginContainer">
        {alert && (
          <ErrorPopup
            variant={"danger"}
            content={"confirm password is not matche with entered password"}
          />
        )}
        {success && (
          <AlertPopup
            show={show}
            setShow={setShow}
            variant={"primary"}
            content={"Login Sucess"}
            check={true}
          />
        )}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handelCatch}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            name="password"
            controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handelCatch}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="Confirmpassword"
              value={confirmPassword}
              onChange={(e) => setCOnfirmPass(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          {/* <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => post_pic(e.target.files[0])}
              label="Upload Profile Picture"
            />
          </Form.Group> */}

          <Button onClick={handleSubmit} variant="primary" type="submit">
            {loading && (
              <Spinner
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {loading ? "loading..." : "Submit"}
          </Button>
          <Row className="py-3">
            <Col>
              Not Regisetered?
              <Link to="/signup">Register</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </NoteTitle>
  );
}

export default Login;
