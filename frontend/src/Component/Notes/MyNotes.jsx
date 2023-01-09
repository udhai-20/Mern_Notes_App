import React from "react";
import NoteTitle from "./NoteTitle";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import notes from "../../data";
function MyNotes({ props }) {
  return (
    <div>
      <NoteTitle title="Welcome Back Udhaya">
        <Link to="/createnote">
          <Button style={{ marginLeft: 10, marginBottom: 6 }}>
            Create a New Note
          </Button>
        </Link>
        {notes?.length > 0 &&
          notes.map((el, i) => {
            return (
              <Accordion>
                <Card style={{ margin: 10 }} key={el._id}>
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
                      }}
                    >
                      <Accordion.Toggle
                        as={Card.Text}
                        variant="link"
                        eventKey="0"
                      >
                        {el.title}
                      </Accordion.Toggle>
                    </span>

                    <div>
                      <Button href={`/note/${el._id}`}>Edit</Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        // onClick={() => deleteHandler(el._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <h4>
                        <Badge variant="success">
                          Category - {el.category}
                        </Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <ReactMarkdown>{el.content}</ReactMarkdown>
                        <footer className="blockquote-footer">
                          Created on{" "}
                          <cite title="Source Title">
                            {/* {el.createdAt.substring(0, 10)} */}
                            Category - {el.category}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            );
          })}
      </NoteTitle>
    </div>
  );
}

export default MyNotes;
