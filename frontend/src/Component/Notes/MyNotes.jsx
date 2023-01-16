import React, { useEffect, useState } from "react";
import NoteTitle from "./NoteTitle";
import { Link } from "react-router-dom";
import axios from "axios";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CreateNotes from "../../Screens/CreateNotes/CreateNotes";
import { notes_Get_Req, notes_delete_Req } from "../../Redux/appReducer/action";
import { getData } from "../utils/localStorage";
import Loading from "../Loading/Loading";
import EditNotes from "../../Screens/EditNotes/EditNotes";
// import notes from "../../data";
function MyNotes({ search }) {
  console.log("env file", process.env);
  const dispatch = useDispatch();
  const { loading, error, auth, notes } = useSelector((state) => {
    return {
      loading: state.appReducer.isLoading,
      error: state.appReducer.isError,
      notes: state.appReducer.notes,
    };
  }, shallowEqual);
  console.log("notes:", notes);
  let username_ls = getData("name");
  const fetch_data = () => {
    dispatch(notes_Get_Req());
  };

  const deleteHandler = (id) => {
    dispatch(notes_delete_Req(id));
  };
  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <div>
      <NoteTitle title={`Welcome Back ${username_ls || ""}`}>
        <div style={{ marginLeft: 10, marginBottom: 6 }}>
          <CreateNotes />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading && <Loading />}
        </div>
        {notes?.length > 0 &&
          notes
            .reverse()
            .filter((el) => el.title.toLowerCase().includes(search))
            .map((el, i) => {
              return (
                <Accordion key={el._id}>
                  <Card style={{ margin: 10 }}>
                    <Card.Header style={{ display: "flex" }}>
                      <span
                        // onClick={() => ModelShow(note)}
                        style={{
                          color: "black",
                          textDecoration: "none",
                          flex: 1,
                          cursor: "pointer",
                          alignSelf: "center",
                          fontSize: 18,
                          border: "none",
                        }}
                      >
                        <Accordion.Header>{el.title}</Accordion.Header>
                      </span>

                      <div>
                        <EditNotes id={el._id} el={el} />
                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => deleteHandler(el._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Header>
                    <Accordion.Body eventkey="0">
                      <Card.Body>
                        <h4>
                          <Badge bg="success">Category-{el.category}</Badge>
                        </h4>
                        <blockquote className="blockquote mb-0">
                          <p>{el.content}</p>
                          <footer className="blockquote-footer,text-muted">
                            creaed-{new Date().toLocaleDateString()}
                          </footer>
                        </blockquote>
                      </Card.Body>
                    </Accordion.Body>
                  </Card>
                </Accordion>
              );
            })}
      </NoteTitle>
    </div>
  );
}

export default MyNotes;
