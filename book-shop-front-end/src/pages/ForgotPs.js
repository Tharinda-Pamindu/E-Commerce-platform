import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import { putRequest } from "../service/ApiService";

const ForgotPs = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [sysMsg, setSysMsg] = useState(null);
  const [showMsg, setShowMsg] = useState(false);

  const handleResetPs = async (event) => {
    event.preventDefault();

    const forgotData = {
      username: username,
      email: email,
      password: password,
    };

    const response = await putRequest("/forgot/user", forgotData);
    if (response && response.status === 200) {
      setSysMsg(response.data.message);
      setShowMsg(true);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Forgot Password | එච්චරයි.LK</title>
      </Helmet>
      <Row>
        <Col></Col>
        <Col className="my-5">
          <div className="p-4 my-form top-space my-bg">
            <h4 className="text-center my-3 text-dark">Forgot Password</h4>
            <Form onSubmit={handleResetPs}>
              <FloatingLabel
                controlId="username"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="name"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="email"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="password"
                label="New Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </FloatingLabel>

              <div className="d-grid gap-2 my-4">
                <Button variant="outline-primary" type="submit">
                  Change Password
                </Button>
              </div>
              <Alert variant="warning" hidden={!showMsg}>
                {sysMsg}
              </Alert>
            </Form>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default ForgotPs;
