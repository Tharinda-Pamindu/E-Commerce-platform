import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import deleteIcon from "./media/recyclebin.svg";
import { postRequest } from "../service/ApiService";
import { Helmet } from "react-helmet";

const user = sessionStorage.getItem("user_id");
const username = sessionStorage.getItem("username");

const Cart = () => {
  const [bookList, setBookList] = useState([]);
  const [total, setTotal] = useState(0);
  const [msg, setMsg] = useState(null);
  const [msgShow, setMsgShow] = useState(false);
  const [color,setColor]=useState(null);

  const fetchCart = () => {
    const data = JSON.parse(localStorage.getItem("books"));
    localStorage.setItem("cart", JSON.stringify(data));
    setBookList(data);

    setTotal(localStorage.getItem("total"));
  };

  const placeOrder = async () => {
    const accData = {
      orderId: 0,
      price: total,
      user: {
        id: user,
        username: username,
      },
      books: bookList,
      status: "pending",
    };
    
    const response = await postRequest("/order", accData);

    if (response && response.status === 200) {
      setTotal(0);
      setBookList([]);
      setMsg("Order placed Successfully");
      setColor("success");
      setMsgShow(true);
      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("books", JSON.stringify([]));
      localStorage.setItem("total", 0);
    } else {
      setColor("danger");
      setMsg("Order Placed Unsuccessfully");
      setMsgShow(true);
    }

  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Container className="mg-top">
      <Helmet>
        <title>Cart | එච්චරයි.LK</title>
      </Helmet>
      <Alert hidden={!msgShow} variant={color}>
        {msg}
      </Alert>
      <Table className="table table-hover table-dark shadow rounded">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bookList &&
            bookList.map((book) => {
              return (
                <tr key={book.id}>
                  <td>{book.name}</td>
                  <td>Rs.{book.unitPrice}/-</td>
                  <td>1</td>
                  <td>
                    <Button
                      onClick={() => {
                        bookList.pop();
                        localStorage.setItem("books", JSON.stringify(bookList));
                        fetchCart();
                      }}
                    >
                      <Image src={deleteIcon} width={25} />
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Row>
        <Col>
          <Alert variant="light">
            <strong>TOTAL : Rs.{total}</strong>
          </Alert>
        </Col>
      </Row>
      <div className="text-end">
        <Button
          variant="outline-success"
          size="lg"
          onClick={() => {
            placeOrder();
          }}
        >
          ORDER NOW
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
