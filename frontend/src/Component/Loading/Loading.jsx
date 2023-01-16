import React from "react";
import { Spinner } from "react-bootstrap";

function Loading(props) {
  return (
    <div>
      <Spinner animation="grow" variant="success" />
    </div>
  );
}

export default Loading;
