import { Carousel, Container, Image } from "react-bootstrap";
import homeImageOne from "../service/home1.png";
import homeImageTwo from "../service/home2.png";
import homeImageThree from "../service/home3.png";
import homeImageFour from "../service/home4.png";

const Home = () => {
  const images = [homeImageOne, homeImageTwo, homeImageThree, homeImageFour];

  return (
    <Container className="mg-top">
      <Carousel>
        {images.map((image) => {
          return (
            <Carousel.Item interval={1000}>
              <Image src={image} className="rounded img-size" />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Container>
  );
};

export default Home;
