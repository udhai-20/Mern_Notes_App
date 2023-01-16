import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getData } from "../../Component/utils/localStorage";
import { notes_post_Req } from "../../Redux/appReducer/action";
let initial = {
  title: "",
  category: "",
  content: "",
};
function CreateNotes() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(initial);
  const { title, category, content } = form;
  const { loading, error, auth, messsage } = useSelector((state) => {
    return {
      loading: state.authReducer.isLoading,
      error: state.authReducer.isError,
      auth: state.authReducer.isAuth,
      messsage: state.authReducer.messsage,
    };
  }, shallowEqual);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCatch = (e) => {
    const { name, value } = e.target;
    console.log("vale", { ...form, [name]: value });
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = () => {
    if (title != "" || category !== "" || content != "") {
      dispatch(notes_post_Req(form));
      setForm({ ...form, title: "", category: "", content: "" });
      console.log(form);
      handleClose();
    } else {
      alert("some of the fields are missing");
    }
  };
  let username_ls = getData("name");
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create New Note
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{username_ls || "notes"}'s Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type="text"
                placeholder="Heading"
                autoFocus
                name="title"
                value={title}
                onChange={handleCatch}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category"
                autoFocus
                name="category"
                value={category}
                onChange={handleCatch}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Content"
                name="content"
                value={content}
                onChange={handleCatch}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateNotes;
