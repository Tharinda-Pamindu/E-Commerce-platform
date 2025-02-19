import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { getRequest, putRequest, putRequestForFile } from "../service/ApiService";
import deleteIcon from "../pages/media/cancle.svg";

const id = sessionStorage.getItem("user_id");

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(null);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchUser = async () => {
    const response = await getRequest(`/user/${id}`);
    setUsername(response.data.username);
    setEmail(response.data.email);
    setUser(response.data);
    setPassword(response.data.password);
  };

  const fetchOrders = async () => {
    const response = await getRequest(`/order/${id}/orders`);
    setOrders(response.data);
  };

  const cancelOrder = async (orderID) => {
    const stts = {
      orderStatus: "cancel",
    };
    await putRequest(`/order/${orderID}`, stts);
    fetchOrders();
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const userUpdates = {
      username: username,
      email: email,
      password: password,
    };

    const response = await putRequest(`/user/${id}`, userUpdates);

    if (response && response.status === 200) {
      console.log("data ok");
      const dp = { profileImage: profilePhoto };

      const res = await putRequestForFile(`/user/${id}/profile`, dp);

      if (res && res.status === 200) {
        setPassword(null);
        setEmail(null);
        setProfilePhoto(null);
        setUsername(null);
        handleClose();
        fetchUser();
      }
    }
  };

  useEffect(() => {
    fetchUser();
    fetchOrders();
  }, []);

  return (
    <Container className="mg-top">
      {user && (
        <Row>
          <Col sm={4} className="m-3 p-4 rounded-5 my-border">
            <div className="text-center">
              <Badge bg="secondary" className="p-2 rounded-5 my-border">
                <Image
                  src={`http://localhost:9000/upload/${user.profileImage}`}
                  width={250}
                  height={250}
                  className="rounded-5"
                />
              </Badge>
            </div>
            <div className="my-3">
              <Alert className="fw-bold">Name : {user.username}</Alert>
            </div>
            <div className="my-3">
              <Alert className="fw-bold">E-mail : {user.email}</Alert>
            </div>
            <div>
              <Button onClick={handleShow}>EDIT</Button>
            </div>
          </Col>

          <Col sm={7} className="my-3 mx-4 p-4 rounded-5 my-border">
            <h3 className="text-center mb-3">Orders</h3>
            <div>
              {orders &&
                orders.map((order) => {
                  return (
                    <Alert className="alert-light border-3">
                      <div>
                        <strong>Ordered Date : </strong>
                        {order.createdAt.substr(0, 10)}
                      </div>
                      <div>
                        <strong>Time : </strong>
                        {order.createdAt.substr(11, 5)}
                      </div>
                      <div>
                        <strong>Total : </strong>
                        Rs.{order.price}
                      </div>
                      <div>
                        <strong>Status : </strong>
                        {order.status}
                      </div>
                      <div>
                        <strong>Books : </strong>
                        {order &&
                          order.books.map((book) => {
                            return <>{book.name}, </>;
                          })}
                      </div>
                      <Button variant="light" className="my-2 p-0">
                        <Image
                          src={deleteIcon}
                          width={40}
                          onClick={() => {
                            cancelOrder(order.orderId);
                          }}
                        />
                      </Button>
                    </Alert>
                  );
                })}
            </div>
          </Col>
        </Row>
      )}

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleUpdate}>
            <FloatingLabel
              controlId="floatingInput"
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
              controlId="floatingInput"
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
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </FloatingLabel>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Profile Photo</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(event) => {
                  setProfilePhoto(event.target.files[0]);
                }}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};
export default Profile;
