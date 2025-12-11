import { Col, Row } from "react-bootstrap";
import logo from "./assets/logo.svg";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Row>
      <Col>
        <header>
          <Link
            to="/"
            className="text-decoration-none d-flex align-items-center"
          >
            <img src={logo} alt="noteflow app logo" className="logo" />
          </Link>
        </header>
      </Col>
    </Row>
  );
}
