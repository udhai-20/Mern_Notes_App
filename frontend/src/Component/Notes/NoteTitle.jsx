import React from "react";
import { Container, Row } from "react-bootstrap";
import "./NoteTitle.css";
function NoteTitle({ title, children }) {
  return (
    <div className="mainback">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr></hr>
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default NoteTitle;
