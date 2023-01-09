import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Footer(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        position: "relative",
        bottom: "0",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">CopyRights &copy;udhaya</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
