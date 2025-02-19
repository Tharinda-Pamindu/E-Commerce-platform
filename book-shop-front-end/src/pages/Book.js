import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Modal,
  Offcanvas,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
  putRequestForFile,
} from "../service/ApiService";
import { useEffect, useState } from "react";
import pen from "./media/pen.svg";
import recyclebin from "./media/recyclebin.svg";
import addIcon from "./media/add.svg";
import { Helmet } from "react-helmet";

const role = sessionStorage.getItem("role");

const Book = () => {
  const [books, setBooks] = useState(null);
  const [buttonHide, setButtonHide] = useState(true);
  const [cusbuttonHide, setCusButtonHide] = useState(true);
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState(null);
  const [bookName, setBookName] = useState(null);
  const [author, setAuthor] = useState(null);
  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [bookDetailsModelShow, setBookDetailsModelShow] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const [bookImage, setBookImage] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateBookId, setUpdateBookId] = useState(null);

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [total, setTotal] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const getAllCategory = async () => {
    const response = await getRequest("/auth/category");
    setCategories(response.data);
  };

  const handleAddBook = async (event) => {
    event.preventDefault();

    const bookData = {
      name: bookName,
      quantity: quantity,
      author: author,
      description: description,
      unitPrice: unitPrice,
      coverImage: null,
      category: {
        id: category,
      },
    };

    const bookCover = {
      coverImage: bookImage,
    };

    const response = await postRequest("/book", bookData);

    if (response && response.status === 200) {
      const updateBookCover = await putRequestForFile(
        `/book/${response.data.id}/profile`,
        bookCover
      );

      if (updateBookCover && updateBookCover.status === 200) {
        handleClose();
        setBookName(null);
        setAuthor(null);
        setUnitPrice(0);
        setQuantity(0);
        setDescription(null);
        setCategory(null);
        getAllBooks();
      } else {
        await deleteRequest(`/book/${response.data.id}`);
      }
    }
  };

  const getAllBooks = async () => {
    const response = await getRequest("/auth/book");
    setBooks(response.data);
  };

  const permission = () => {
    if (role === "ADMIN") {
      setButtonHide(false);
      setCusButtonHide(false);
    }

    if (role === "SELLER") {
      setButtonHide(false);
      setCusButtonHide(false);
    }

    if (role === "USER") {
      setCusButtonHide(false);
    }
  };

  const deleteBook = async (id) => {
    const response = await deleteRequest(`/book/${id}`);

    if (response && response.status === 200) {
      getAllBooks();
    }
  };

  const handleUpdateBook = async (event) => {
    event.preventDefault();

    const updateData = {
      name: bookName,
      quantity: quantity,
      author: author,
      description: description,
      unitPrice: unitPrice,
      coverImage: bookImage,
      category: {
        id: category,
      },
    };

    const response = await putRequest(`/book/${updateBookId}`, updateData);

    if (response && response.status === 200) {
      setBookName(null);
      setAuthor(null);
      setDescription(null);
      setUnitPrice(0);
      setQuantity(0);
      setCategory(null);
      handleCloseUpdate();
      getAllBooks();
    }
  };

  const checkQuantity = (qty) => {
    if (qty > 0) {
      return "More";
    } else {
      return "Out of Stocks";
    }
  };

  const setColor = (qty) => {
    if (qty > 0) {
      return "primary";
    } else {
      return "danger";
    }
  };

  useEffect(() => {
    getAllBooks();
    getAllCategory();
    permission();
  }, [categories]);

  return (
    <Container fluid className="mg-top">
      <Helmet>
        <title>Books | එච්චරයි.LK</title>
      </Helmet>
      <Row>
        <Col sm={11} className="text-center">
          <Alert className="my-border" variant="secondary">
            <strong>BOOKS</strong>
          </Alert>
        </Col>
        <Col sm={1}>
          <Button
            variant="outline-secondary"
            className="my-border"
            hidden={buttonHide}
            onClick={() => {
              handleShow();
              setBookName(null);
              setAuthor(null);
              setUnitPrice(0);
              setQuantity(0);
              setCategories(null);
              setDescription(null);
              setBookImage(null);
            }}
          >
            <h2>+</h2>
          </Button>
        </Col>
      </Row>

      <Row>
        {books &&
          books.map((book) => {
            return (
              <Col
                sm={2}
                className="my-bg py-3 ps-2 pe-3 m-3 rounded my-border"
                key={book.id}
              >
                <Row>
                  {/* Book Image */}
                  <Col sm={8}>
                    <Image
                      className="rounded my-border"
                      src={`http://localhost:9000/upload/${book.coverImage}`}
                      width={135}
                    />
                  </Col>

                  {/* Buttons */}
                  <Col sm={4}>
                    {/* Update Button */}
                    <div className="mb-3">
                      <OverlayTrigger
                        overlay={<Tooltip id="update">Update Book</Tooltip>}
                      >
                        <Button
                          variant="outline-light"
                          size="sm"
                          className="me-3"
                          hidden={buttonHide}
                          onClick={() => {
                            setBookName(book.name);
                            setAuthor(book.author);
                            setDescription(book.description);
                            setUnitPrice(book.unitPrice);
                            setQuantity(book.quantity);
                            setCategory(book.category);
                            setUpdateBookId(book.id);
                            handleShowUpdate();
                          }}
                        >
                          <Image src={pen} width={40} />
                        </Button>
                      </OverlayTrigger>
                    </div>

                    {/* Delete BUtton */}
                    <div className="mb-3">
                      <OverlayTrigger
                        overlay={<Tooltip id="update">Delete Book</Tooltip>}
                      >
                        <Button
                          variant="outline-light"
                          size="sm"
                          className="me-3"
                          hidden={buttonHide}
                          onClick={() => {
                            deleteBook(book.id);
                          }}
                        >
                          <Image src={recyclebin} width={40} roundedCircle />
                        </Button>
                      </OverlayTrigger>
                    </div>

                    {/*Add to Cart Button*/}
                    <div className="mb-3">
                      <OverlayTrigger
                        overlay={<Tooltip id="update">Add to Cart</Tooltip>}
                      >
                        <Button
                          variant="outline-light"
                          size="sm"
                          className="me-3"
                          hidden={cusbuttonHide}
                          disabled={book.quantity < 1}
                          onClick={async () => {
                            const collectData = {
                              id: book.id,
                              name: book.name,
                              quantity: book.quantity,
                              author: book.author,
                              description: book.description,
                              unitPrice: book.unitPrice,
                              coverImage: book.coverImage,
                              category: {
                                id: book.category.id,
                                title: book.category.title,
                              },
                            };
                            const update = await [...cart, collectData];
                            setCart(update);
                            localStorage.setItem(
                              "books",
                              JSON.stringify(update)
                            );
                            const sum = await (total + book.unitPrice);
                            setTotal(sum);
                            localStorage.setItem("total", sum);
                          }}
                        >
                          <Image src={addIcon} width={40} roundedCircle />
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="p-2 text-danger">
                      <strong>{book.name}</strong>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-3 align-text-bottom">
                  <Col sm={6}>
                    <h4 className="">Rs.{book.unitPrice}</h4>
                  </Col>
                  <Col sm={6}>
                    <div className="d-grid gap-2">
                      <Button
                        size="sm"
                        variant={setColor(book.quantity)}
                        hidden={cusbuttonHide}
                        disabled={book.quantity < 1}
                        onClick={() => {
                          setSubTotal(0);
                          setBookDetails(book);
                          setBookDetailsModelShow(true);
                        }}
                      >
                        <strong>{checkQuantity(book.quantity)}</strong>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            );
          })}
      </Row>

      {/* Book Details Show */}
      <Modal
        show={bookDetailsModelShow}
        onHide={() => setBookDetailsModelShow(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {bookDetails && bookDetails.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={5}>
              {bookDetails && (
                <Image
                  className="p-1 m-3 rounded my-border"
                  src={`http://localhost:9000/upload/${bookDetails.coverImage}`}
                  width={250}
                />
              )}
            </Col>
            <Col className="border-start" sm={6}>
              {bookDetails && (
                <div>
                  <h3 className="text-danger">Rs.{bookDetails.unitPrice}</h3>
                  <div>
                    Written By <h5>{bookDetails.author}</h5>
                  </div>
                  <div className="mb-2">
                    <strong>{bookDetails.category.title}</strong>
                  </div>
                  <div>{bookDetails.description}</div>
                  <div className="my-3">
                    Available Quantity : <strong>{bookDetails.quantity}</strong>
                  </div>
                  <Row>
                    <Col sm={5}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Quantity"
                        className="my-3"
                      >
                        <Form.Control
                          type="number"
                          placeholder="Quantity"
                          onChange={(event) => {
                            const total =
                              bookDetails.unitPrice * event.target.value;
                            setSubTotal(total);
                          }}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col sm={6}>
                      <Alert variant="success" className="my-3 p-3">
                        Rs.{subTotal}
                      </Alert>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button className="my-3" variant="outline-danger">
                        ADD CART
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/*new Book Add*/}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <strong>ADD NEW BOOK</strong>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleAddBook}>
            <FloatingLabel
              controlId="bookName"
              label="Book Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="name"
                onChange={(event) => {
                  setBookName(event.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Author"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Author"
                onChange={(event) => {
                  setAuthor(event.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="price"
              label="Unit Price"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="Unit Price"
                onChange={(event) => {
                  setUnitPrice(event.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="qty" label="Quantity" className="mb-3">
              <Form.Control
                type="number"
                placeholder="Quantity"
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
              />
            </FloatingLabel>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <option disabled>Select Category</option>
              {categories &&
                categories.map((category) => {
                  return <option value={category.id}>{category.title}</option>;
                })}
            </Form.Select>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Book Cover Image</Form.Label>
              <Form.Control
                type="file"
                size="sm"
                onChange={(event) => {
                  setBookImage(event.target.files[0]);
                }}
              />
            </Form.Group>
            <FloatingLabel
              controlId="floatingPassword"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                rows={3}
                wrap="soft"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </FloatingLabel>
            <Button type="submit">SAVE</Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      {/*Update Book*/}
      <Modal
        show={showUpdate}
        onHide={handleCloseUpdate}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>{bookName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateBook}>
            <FloatingLabel
              controlId="floatingInput"
              label="Book Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="name"
                value={bookName}
                onChange={(event) => {
                  setBookName(event.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Author"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="author"
                value={author}
                onChange={(event) => {
                  setAuthor(event.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Unit Price"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="author"
                value={unitPrice}
                onChange={(event) => {
                  setUnitPrice(event.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Quantity"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="author"
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
              />
            </FloatingLabel>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <option disabled>Select Category</option>
              {categories &&
                categories.map((category) => {
                  return <option value={category.id}>{category.title}</option>;
                })}
            </Form.Select>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Book Cover Image</Form.Label>
              <Form.Control
                type="file"
                size="sm"
                onChange={(event) => {
                  setBookImage(event.target.files[0]);
                }}
              />
            </Form.Group>
            <FloatingLabel
              controlId="floatingPassword"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                rows={3}
                wrap="soft"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </FloatingLabel>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
            &nbsp;
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default Book;
