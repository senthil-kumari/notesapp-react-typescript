import { Badge, Button, Col, Modal, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

type NoteProps = {
  onDelete: (id: string) => void;
};
export default function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div
        className="stickyNoteDetail p-4 shadow-lg pinnedNote "
        style={{
          background: `linear-gradient(${note.color}, ${note.color}d0)`,
        }}
      >
        <Row>
          <Col>
            <div className="">
              <h2 className="mb-3">{note.title}</h2>
              {note.tags.length > 0 && (
                <Stack
                  gap={1}
                  direction="horizontal"
                  className="flex-wrap mb-2"
                >
                  {note.tags.map((tag) => (
                    <Badge key={tag.id} className="text-truncate">
                      {tag.label}
                    </Badge>
                  ))}
                </Stack>
              )}
            </div>
          </Col>
          <Col xs="auto">
            <Stack direction="horizontal" gap={2}>
              <Link to={`/${note.id}/edit`}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={handleShow} variant="danger">
                Delete
              </Button>
              <Link to="/">
                <Button variant="secondary">Back</Button>
              </Link>
            </Stack>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              className="m-3 markdown-content"
              style={{ whiteSpace: "pre-wrap" }}
            >
              <ReactMarkdown>{note.markdown}</ReactMarkdown>
            </div>
          </Col>
        </Row>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this note?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              onDelete(note.id);
              navigate("/");
            }}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
