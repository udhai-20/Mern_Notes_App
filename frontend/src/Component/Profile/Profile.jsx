import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import "./Profile.css";
import NoteTitle from "../Notes/NoteTitle";
import { getData } from "../utils/localStorage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
let initial = {
  name: "",
  email: "",
  password: "",
};
function Profile(props) {
  let loading = false;
  let username_ls = getData("name");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const { name, email, password } = form;

  const handleCatch = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Container className="profile_cont">
        <NoteTitle title={`${username_ls || ""}'S Profile Section`}>
          <Row>
            <Col md={6}>
              Form Section
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>UserName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={name}
                    name="name"
                    onChange={handleCatch}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    name="email"
                    onChange={handleCatch}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    name="password"
                    onChange={handleCatch}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  {loading && (
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  {loading ? "loading..." : "Update"}
                </Button>
              </Form>
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              md={6}
            >
              Profile Section
            </Col>
          </Row>
        </NoteTitle>
      </Container>
    </>
  );
}

export default Profile;
