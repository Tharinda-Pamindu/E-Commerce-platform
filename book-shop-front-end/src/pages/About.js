import {
  Alert,
  Badge,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import logo from "../pages/media/logo.png";

const About = () => {
  return (
    <Container className="mg-top">
      {/* <Row className="m-4 my-bg shadow rounded p-4">
        <Col>
            <h4>Resources:</h4>
        </Col>
      </Row> */}
      <Helmet>
        <title>About us | එච්චරයි.LK</title>
      </Helmet>
      <Row>
        <Col sm={7} className="my-bg ms-4 rounded shadow p-3">
          <Badge bg="light" className="mb-3">
            <Image src={logo} width={120} />
          </Badge>
          <Alert variant="light" className="p-4">
            A Bookstore for All එච්චරයි.LK is a bookstore located in Ratnapura,
            Sri Lanka. It was founded in 2023 by two passionate book lovers, who
            wanted to create a space where people of all ages could come
            together to enjoy the written word. The name එච්චරයි.LK is a Sinhala
            word that means "not much." The owners chose this name because they
            believe that everyone should have access to books, regardless of
            their budget. They stock a wide variety of books, from new releases
            to classics, at affordable prices. In addition to books, එච්චරයි.LK
            also offers a variety of other services, such as book readings,
            author talks, and writing workshops. They also have a small cafe
            where customers can relax and enjoy a cup of coffee while they
            browse the shelves. එච්චරයි.LK is a welcoming and inclusive space
            where everyone is encouraged to explore their love of reading.
            Whether you're a seasoned bibliophile or just starting out, you're
            sure to find something to your liking at එච්චරයි.LK.
          </Alert>
        </Col>
        <Col sm={4} className="p-3 ms-5 rounded my-bg shadow">
          <h5>Here are some additional details about the bookstore:</h5>
          <ListGroup>
            <ListGroup.Item>
              It is located in the heart of Ratnapura, making it easily
              accessible to locals and tourists alike.
            </ListGroup.Item>
            <ListGroup.Item>
              It is open seven days a week, from 10am to 8pm.
            </ListGroup.Item>
            <ListGroup.Item>
              The staff is friendly and knowledgeable, and they are always happy
              to help you find the perfect book.
            </ListGroup.Item>
            <ListGroup.Item>
              The bookstore hosts regular events, such as book signings,
              readings, and workshops.
            </ListGroup.Item>
            <ListGroup.Item>
              It is a great place to relax and enjoy a cup of coffee while you
              browse the shelves.
            </ListGroup.Item>
            <ListGroup.Item>
              If you're looking for a bookstore that offers a wide variety of
              books at affordable prices, as well as a variety of other services
              and events, then එච්චරයි.LK is the perfect place for you.
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
export default About;
