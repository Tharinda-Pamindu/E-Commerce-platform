import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import study from "../media/PinClipart.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const cart = [];

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/auth/login",
        loginData
      );

      if (response && response.status === 200) {
        console.log(response);
        setUsername("");
        setPassword("");
        setError("");
      }

      sessionStorage.setItem("token", response.data.jwt);
      sessionStorage.setItem("username", response.data.username);
      sessionStorage.setItem("user_id", response.data.id);
      sessionStorage.setItem("role", response.data.role);
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("total", 0);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.jwt}`;

      navigate("/protect");
    } catch (error) {
      setError("Username or password incorrect");
    }
  };

  return (
    <Container fluid>
      <Helmet>
        <title>User Login | එච්චරයි.LK</title>
      </Helmet>
      <Row>
        <Col sm={8}>
          <Image
            src={study}
            height={400}
            className="mt-5 pt-5 mx-5 top-space"
          />
        </Col>
        <Col className="m-5" sm={3}>
          <div className="p-4 my-form top-space my-bg">
            <h4 className="text-center mb-3 text-dark">LOGIN</h4>
            <Form onSubmit={handleLogin}>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="username"
                  type="text"
                  placeholder="name"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <label htmlFor="floatingInputCustom">Username</label>
              </Form.Floating>
              <Form.Floating>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <label htmlFor="floatingPasswordCustom">Password</label>
              </Form.Floating>
              <div className="d-grid gap-2 my-3">
                <Button variant="outline-primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
            <div className="text-danger">{error}</div>
            <hr />
            <div className="mt-3 text-center">
              <a href="/forgot">Forgot password</a>
              <div>OR</div>
              <a href="/register" className="text-success">
                Create Account
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
