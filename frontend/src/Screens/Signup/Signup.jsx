import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NoteTitle from "../../Component/Notes/NoteTitle";
import { Navigate, useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { register } from "../../Redux/authReducer/action";
import { Spinner } from "react-bootstrap";
let initial = {
  name: "",
  email: "",
  password: "",
};
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const { name, email, password } = form;
  const { loading, error, auth, messsage } = useSelector((state) => {
    return {
      loading: state.authReducer.isLoading,
      error: state.authReducer.isError,
      auth: state.authReducer.isAuth,
      messsage: state.authReducer.messsage,
    };
  }, shallowEqual);
  console.log("messsage:", messsage);
  const handleCatch = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form)).then((res) => {
      console.log(res.data);
      if (res.data.message == "registerd successfully") {
        navigate("/login");
      }
    });
  };

  return (
    <>
      <NoteTitle title={"REGISTER"}>
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
            {loading ? "loading..." : "Submit"}
          </Button>
        </Form>
      </NoteTitle>
    </>
  );
}

export default Signup;
