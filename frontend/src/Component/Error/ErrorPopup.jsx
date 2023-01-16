import React from "react";
import { Alert } from "react-bootstrap";

function ErrorPopup({ variant, content }) {
  return (
    <div>
      <Alert variant={variant}>{content}</Alert>
    </div>
  );
}

export default ErrorPopup;
