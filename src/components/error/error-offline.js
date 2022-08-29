import ErrorFooter from "./error-footer";
import { Col, Container, Row } from "reactstrap";
import vectorInterface from "../../assets/images/doodles/doodle.png";
import vectorInterfaceLarge from "../../assets/images/doodles/@x2/doodle.png";

const ErrorOffline = () => (
  <section className="content min-vh-100 d-flex justify-content-center align-items-center">
    <Container fluid className="text-center">
      <Row className="justify-content-center">
        <Col sm={4}>
          <div className="maintenance-img mt-5">
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={vectorInterfaceLarge}
              />
              <img
                alt=""
                src={vectorInterface}
                className="img-fluid mx-auto d-block"
              />
            </picture>
          </div>
        </Col>
      </Row>
      <h3 className="mt-5 secondary-color ">No Internet!</h3>
      <p className="font-size-13 text-secondary-dim">
        Please check your internet connection and try again
      </p>
      <div className="d-flex justify-content-center">
        <ErrorFooter />
      </div>
    </Container>
  </section>
);

export default ErrorOffline;
