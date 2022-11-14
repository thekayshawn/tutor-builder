import { Col, Container, Row } from "reactstrap";
import vectorInterface from "../../assets/images/doodles/doodle.png";
import vectorInterfaceLarge from "../../assets/images/doodles/@x2/doodle.png";
import { WEBSITE_URL } from "src/config";

const Error440 = () => (
  <section className="min-vh-100 w-100 position-absolute top-0 end-0 bottom-0 start-0 d-flex justify-content-center align-items-center bg-light z-10000">
    <Container fluid className="text-center">
      <Row className="justify-content-center mx-0 w-100">
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
      <h3 className="mt-5 secondary-color ">Session Expired!</h3>
      <p className="font-size-13 text-secondary-dim">
        Your session has been expired. Please sign-in again!
      </p>
      <div className="d-flex justify-content-center">
        <a
          href={`${WEBSITE_URL}/auth/signup`}
          className="btn btn-outline-secondary border text-secondary border-secondary me-2"
        >
          Sign Up
        </a>
        <a
          href={`${WEBSITE_URL}/auth/login`}
          className="btn btn-secondary py-2"
        >
          Sign in
        </a>
      </div>
    </Container>
  </section>
);

export default Error440;
