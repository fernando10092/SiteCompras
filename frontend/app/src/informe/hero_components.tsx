import { Layout, ImgCarousel } from "./hero_styled";
import Carousel from 'react-bootstrap/Carousel';
import modelo1 from "../assets/modelo1.jpg";
import modelo2 from "../assets/modelo2.jpg";

const HeroComponents = () => {

    return (
        <>
            <Layout>
                <Carousel fade>
                    <Carousel.Item>
                        <ImgCarousel src={modelo1}/>
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <ImgCarousel src={modelo2}/>
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <ImgCarousel src={modelo1}/>
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Layout>
        </>
    )
}

export default HeroComponents;