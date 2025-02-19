import {
  Button,
  Container,
  Form,
  Image,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import logo from "../pages/media/logo.png";
import userIcon from "./auth.svg";
import { useState } from "react";
import cart from "./cart.png";

const ProtectedRoutes = () => {
  const token = sessionStorage.getItem("token");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary shadow" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/protect">
            &nbsp;
            <Image src={logo} width={150} height={40} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
            >
              <Nav.Link href="/protect/book">
                &nbsp;<strong>BOOK</strong>&nbsp;
              </Nav.Link>
              <Nav.Link href="/protect/category">
                &nbsp;<strong>CATEGORY</strong>&nbsp;
              </Nav.Link>
              <Nav.Link href="/protect/profile">
                &nbsp;<strong>PROFILE</strong>&nbsp;
              </Nav.Link>
              <Nav.Link href="/protect/about">
                &nbsp;<strong>ABOUT US</strong>&nbsp;
              </Nav.Link>
              <Nav.Link href="/protect/help">
                &nbsp;<strong>HELP</strong>&nbsp;
              </Nav.Link>
            </Nav>
            <Button variant="light" className="me-3">
              <Image
                src={cart}
                width={35}
                onClick={() => {
                  window.location.href = "/cart";
                }}
              />
            </Button>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
            <Button className="ms-2" variant="light" onClick={handleShow}>
              <Image src={userIcon} width={35} />
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />

      <footer>
        <Container fluid className="bg-light py-3 shadow">
          <div className="text-center">
            <Image src={logo} width={120} height={30} />
          </div>
        </Container>
      </footer>

      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop="static"
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile Manager</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            {user && (
              <Image
                src={`http://localhost:9000/upload/${user.profileImage}`}
                width={200}
              />
            )}
          </div>
          <div>User ID : {sessionStorage.getItem("user_id")}</div>
          <div>Name : {sessionStorage.getItem("username")}</div>
          <div className="mt-5">
            <Button
              variant="danger"
              onClick={() => {
                sessionStorage.removeItem("username");
                sessionStorage.removeItem("user_id");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("role");
                window.location.href = "/login";
              }}
            >
              Log out
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ProtectedRoutes;
