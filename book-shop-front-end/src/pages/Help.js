import { Badge, Col, Container, Image, Row } from "react-bootstrap";
import phone from "../pages/media/phone.svg";
import email from "../pages/media/email.svg";
import seller from "../pages/media/seller.svg";
import benefit from "../pages/media/benefit.svg";
import register from "../pages/media/register.svg";
import login from "../pages/media/login.svg";
import ads from "../pages/media/ads.svg";
import customer from "../pages/media/customer.svg";
import { Helmet } from "react-helmet";

const Help = () => {
  return (
    <Container className="mg-top" fluid>
      <Helmet>
        <title>Help | එච්චරයි.LK</title>
      </Helmet>
      <h1 className="text-center mb-3">WE ARE ALWAYS WITH YOU</h1>
      <Row>
        <Col className="p-3 m-3">
          <Row>
            <Col sm={8}>
              <h4>
                Become a SELLER <Badge>Pro</Badge>
              </h4>
              <div className="fw-medium">
                Firstly, You should <a href="/register">register</a> as a USER.
                After that you must send a request for you want to become a
                SELLER. Finally Our team Manager may be accept you request after
                considering you qualification.
              </div>
            </Col>
            <Col sm={4}>
              <Image src={seller} width={200} />
            </Col>
          </Row>
        </Col>
        <Col className="p-3 m-3">
          <Row>
            <Col sm={7}>
              <h4>
                SELLER Benefits <Badge bg="danger">Exclusive</Badge>
              </h4>
              <div className="fw-medium">Add, Edit and Remove Books</div>
              <div className="fw-medium">Sell your Books in Web Site</div>
              <div className="fw-medium">Order Books</div>
            </Col>
            <Col sm={5}>
              <Image src={benefit} width={200} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="p-3 m-3">
          <Row>
            <Col sm={8}>
              <h4>How to Register</h4>
              <div>
                You can <a href="/register">register</a> as USER in our Site. If you want to Register in
                our web site, You can use your email address.
              </div>
            </Col>
            <Col sm={4}>
              <Image src={register} width={200} />
            </Col>
          </Row>
        </Col>
        <Col className="p-3 m-3">
          <Row>
            <Col sm={7}>
              <h4>How to login</h4>
              <div>
                Enter your username and password, You will be able to <a href="/login">login</a> Web
                site.
              </div>
            </Col>
            <Col sm={5}>
              <Image src={login} width={200} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="p-3 m-3">
          <Row>
            <Col sm={8}>
              <h4>
                Ads Center <Badge>New</Badge>
              </h4>
              <div className="fw-bold">
                Best advertising platform in Sri Lanka. You can share your ads
                with everyone.
              </div>
              <div className="mt-3">Send your Ads with Details</div>
              <div className="mt-2 fw-bold">
                <Image src={email} width={36} /> <a href="mailto:  tharipami2k20@gmail.com">adscenter@gamil.com</a>
              </div>
            </Col>
            <Col sm={4}>
              <Image src={ads} width={190} />
            </Col>
          </Row>
        </Col>
        <Col className="p-3 m-3">
          <Row>
            <Col sm={7}>
              <h4>Customer Care Center</h4>
              <div>
                Communication, Problem Resolution, Product Knowledge,
                Accessibility, Empathy, Timeliness, Feedback Collection,
                Training, Consistency, Customer Satisfaction, Personalization,
                Proactive Support
                <div className="fw-bold mt-3">
                  <Image src={phone} width={30} />
                  +94 70 xxx xxxx
                </div>
                <div className="fw-bold mt-3">
                  <Image src={email} width={36} /> <a href="mailto: tharipami2k20@gmail.com">echcharailk@gmail.lk</a>
                </div>
              </div>
            </Col>
            <Col sm={5}>
              <Image src={customer} width={200}/>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Help;
