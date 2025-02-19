import {
  Button,
  Container,
  Form,
  Image,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import logo from "../media/logo.png";
import badUser from "../media/bad.svg";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary shadow" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image src={logo} width={150} height={40} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
            >
              <Nav.Link href="/book">
                &nbsp;<strong>BOOK</strong>&nbsp;
              </Nav.Link>
              <Nav.Link href="/category">
                &nbsp;<strong>CATEGORY</strong>&nbsp;
              </Nav.Link>
              <strong>
                <NavDropdown title="USER" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/login">USER LOGIN</NavDropdown.Item>
                  <NavDropdown.Item href="/register">
                    NEW USER REGISTER
                  </NavDropdown.Item>
                </NavDropdown>
              </strong>
              <Nav.Link href="/about">
                &nbsp;<strong>ABOUT US</strong>&nbsp;
              </Nav.Link>
              <Nav.Link href="/help">
                &nbsp;<strong>HELP</strong>&nbsp;
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
            <a href="/login" className="ms-3">
              <Image src={badUser} width={35} />
            </a>
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
    </>
  );
};

export default Layout;
