import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { getRequest, postRequest } from "../service/ApiService";
import arrow from "../pages/media/book.svg";
import empty from "../pages/media/noItem.svg";
import { Helmet } from "react-helmet";

const Category = () => {
  const [categories, setCategories] = useState(null);
  const [show, setShow] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState(null);
  const [buttonHide, setButtonHide] = useState(true);
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState(null);
  const [showBooks, setShowBooks] = useState(false);
  const role = sessionStorage.getItem("role");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseBookShow = () => setShowBooks(false);
  const handleShowBookShow = () => setShowBooks(true);

  const getAllCategory = async () => {
    const response = await getRequest("/auth/category");
    setCategories(response.data);
  };

  const handleAddCategory = async (event) => {
    event.preventDefault();

    const categoryData = {
      title: categoryTitle,
    };

    const response = await postRequest("/category", categoryData);
    console.log(response);
    if (response && response.status === 200) {
      getAllCategory();
      setCategoryTitle(null);
      handleClose();
    }
  };

  const chechQuantity = (qty) => {
    if (qty > 0) {
      return <div>Available {qty} Books</div>;
    } else {
      return <div className="text-danger fw-bold">Out of Stock</div>;
    }
  };

  const permission = () => {
    if (role === "ADMIN") {
      setButtonHide(false);
    }
  };

  useEffect(() => {
    permission();
    getAllCategory();
  }, []);

  return (
    <Container fluid className="mg-top">
      <Helmet>
        <title>Category | එච්චරයි.LK</title>
      </Helmet>
      <Row>
        <Col sm={11}>
          <Alert variant="secondary" className="text-center my-border">
            <strong>CATEGORY</strong>
          </Alert>
        </Col>
        <Col sm={1}>
          <Button
            variant="outline-secondary"
            className="my-border"
            onClick={handleShow}
            hidden={buttonHide}
          >
            <h2>+</h2>
          </Button>
        </Col>
      </Row>
      <Row>
        {categories &&
          categories.map((category) => {
            return (
              <Col
                sm={2}
                className="my-bg p-3 m-3 rounded my-border rounded-end-pill"
              >
                <Row>
                  <Col sm={8}>
                    <strong>{category.title}</strong>
                  </Col>
                  <Col sm={4}>
                    <Button
                      size="sm"
                      variant="light"
                      className="p-0 rounded-circle"
                      onClick={async () => {
                        setBooks(null);
                        const response = await getRequest(`/auth/${category.id}`);
                        setBooks(response.data);
                        setTitle(category.title);
                        handleShowBookShow();
                      }}>
                      <Image src={arrow} width={40} />
                    </Button>
                  </Col>
                </Row>
              </Col>
            );
          })}
      </Row>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <strong>ADD NEW CATEGORY</strong>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleAddCategory}>
            <FloatingLabel
              controlId="category"
              label="Category"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="name"
                onChange={(event) => {
                  setCategoryTitle(event.target.value);
                }}
              />
            </FloatingLabel>
            <Button type="submit">ADD</Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={showBooks} onHide={handleCloseBookShow}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title} Books</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            hidden={books && books.length !== [].length}
            className="text-center"
          >
            <Image src={empty} width={200}/>
            <h3>No Items</h3>
          </div>
          {books &&
            books.map((book) => {
              return (
                <div className="card text-bg-primary mb-3 my-border">
                  <div className="card-header">
                    <h4>{book.name}</h4>
                  </div>
                  <div className="card-body">
                    <div className="card-text bg-light text-dark rounded p-3">
                      <Row>
                        <Col>
                          <Image
                            className="rounded my-border"
                            src={`http://localhost:9000/upload/${book.coverImage}`}
                            width={135}
                          />
                        </Col>
                        <Col>
                          <h5 className="text-danger mt-2">
                            Rs.{book.unitPrice}/-
                          </h5>
                          <div className="mt-2">
                            {chechQuantity(book.quantity)}
                          </div>
                          <div className="mt-2">By</div>
                          <div className="fw-bold">{book.author}</div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              );
            })}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default Category;
