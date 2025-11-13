import { useRef, useState, type FormEvent } from "react";
import {
  Button,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { type NoteData } from "./App";
import { type Tag } from "./App";
import { v4 as uuidv4 } from "uuid";
import { ColorPicker } from "./Colorpicker";
type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
  color = "#EBEBEA",
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const [selectedColor, setSelectedColor] = useState(color);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markDownRef.current!.value,
      tags: selectedTags,
      color: selectedColor,
    });

    navigate("..");
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4} className="mb-3">
        <Row>
          <Col md={3} sm={12}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                ref={titleRef}
                defaultValue={title}
                placeholder="Enter note title"
                maxLength={50}
              />
            </Form.Group>
          </Col>
          <Col md={5} sm={12}>
            <Form.Group controlId="color">
              <Form.Label>Color</Form.Label>
              <ColorPicker
                selectedColor={selectedColor}
                onChange={setSelectedColor}
              />
            </Form.Group>
          </Col>
          <Col md={4} sm={12}>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidv4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                isMulti
                placeholder="Select or create tags"
                value={selectedTags.map((tag) => {
                  return {
                    label: tag.label,
                    value: tag.id,
                  };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return {
                        label: tag.label,
                        id: tag.value,
                      };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="markdown">
          <Form.Label>
            Body
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Supports Markdown</Tooltip>}
            >
              <span style={{ marginLeft: "5px", cursor: "pointer" }}>ℹ️</span>
            </OverlayTrigger>
          </Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={13}
            placeholder="Add your note body… (Markdown supported)"
            ref={markDownRef}
            defaultValue={markdown}
            maxLength={500}
          />
        </Form.Group>
        <Form.Text className="text-muted">
          Supports <strong>Markdown</strong>.{" "}
          <a
            href="https://commonmark.org/help/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn how
          </a>
          .
        </Form.Text>
      </Stack>
      <Stack direction="horizontal" gap={2} className="justify-content-end p-4">
        <Button type="submit" variant="primary">
          Save
        </Button>
        <Link to="..">
          <Button type="button" variant="outline-secondary">
            Cancel
          </Button>
        </Link>
      </Stack>
    </Form>
  );
}
