import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Row, Toast } from "react-bootstrap";

function AlertPopup({ variant, content, show, setShow }) {
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (show) {
      const id = setTimeout(() => {
        setShow(false);
      }, 1000);
      setTimeoutId(id);
    } else {
      clearTimeout(timeoutId);
    }
  }, [show]);
  return <div>{show && <Alert variant={variant}>{content}</Alert>}</div>;
}

export default AlertPopup;
