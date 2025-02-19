import { useState } from "react";
import pic from "../media/Pin.png";
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [buttonShow, setButtonShow] = useState(false);
  const [msg, setMsg] = useState(null);
  const [erAlert, showErAlert] = useState(true);
  const [success, setSuccess] = useState(true);

  const handleRegister = async (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
    };

    try {
      const res = await axios.post("http://localhost:9000/auth/register", data);
      if (res && res.status === 200) {
        setMsg(res.data.message);
        setSuccess(false);
        showErAlert(true);
        setUsername(null);
        setEmail(null);
        setPassword(null);
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setSuccess(true);
      showErAlert(false);
      console.log(error.response.data.message);
    }
  };

  return (
    <Container fluid>
      <Helmet>
        <title>User Register | එච්චරයි.LK</title>
      </Helmet>
      <Row>
        <Col sm={7}>
          <Image src={pic} height={450} className="mt-5 pt-5 mx-5 top-space" />
        </Col>
        <Col className="m-5" sm={4}>
          <div className="p-4 my-form my-bg top-space">
            <h4 className="text-center mb-3 text-dark">REGISTER</h4>
            <Form onSubmit={handleRegister}>
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
                    if (event.target.value.length >= 7) {
                      setButtonShow(true);
                    }
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
                label="Password"
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
                <Button
                  variant="outline-primary"
                  type="submit"
                  disabled={!buttonShow}
                >
                  Save
                </Button>
              </div>
            </Form>
            <Alert variant="success" hidden={success}>
              {msg}
            </Alert>
            <Alert variant="danger" hidden={erAlert}>
              {msg}
            </Alert>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Register;
