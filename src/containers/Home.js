// Utils.
import { URL_LOGOUT, URL_WEBSITE, URL_DASHBOARD_CONTENT_BUILDER } from "../env";

// Components.
import { Col, Container, Row } from "reactstrap";

// Static.
import imgLogo from "../assets/images/logo.png";
import imgMeeting from "../assets/images/illustrations/meeting.jpg";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <main className="bg-white">
      <Container className="py-3">
        <Row className="gy-3">
          <Col xs={12} className="border-bottom pb-3">
            <img src={imgLogo} alt="" className="img-thumbnail border-0" />
          </Col>
          <Col xs={12}>
            <h1>Welcome, {user ? user.name : "Anonymous"}</h1>
            <Row className="align-items-center">
              <Col xs={12} md={6}>
                <img src={imgMeeting} alt="" className="img-fluid" />
              </Col>
              <Col xs={12} md={6}>
                <div className="hstack gap-2">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={URL_DASHBOARD_CONTENT_BUILDER || ""}
                    className="btn btn-secondary"
                  >
                    Dashboard
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={URL_WEBSITE || ""}
                    className="btn btn-secondary"
                  >
                    Website
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={URL_LOGOUT || ""}
                    className="btn btn-secondary"
                  >
                    Logout
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Home;
