import { Col, Container, Row } from "react-bootstrap";
import pencilIcon from "./assets/pencil-logo.jpg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Row>
      <Col>
        <header className="align-items-center">
          <Link to="/" className="text-decoration-none d-flex">
            <img src={pencilIcon} alt="note app logo" className="logo" />
            <h1 className="main-header">NoteFlow</h1>
          </Link>
        </header>
      </Col>
    </Row>
  );
}
