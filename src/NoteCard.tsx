import { useState } from "react";
import { Badge, Card, Stack } from "react-bootstrap";
import type { SimplifiedNote } from "./NoteList";
import { Link } from "react-router-dom";

const rotationClasses = [
  "sticky-note-1",
  "sticky-note-2",
  "sticky-note-3",
  "sticky-note-4",
  "sticky-note-5",
];
const getRandomRotationClass = () =>
  rotationClasses[Math.floor(Math.random() * rotationClasses.length)];

const stripHtmlTags = (htmlString: string) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};

export function NoteCard({ id, title, tags, color, markdown }: SimplifiedNote) {
  const [rotationClass] = useState(getRandomRotationClass);
  return (
    <Card
      as={Link}
      to={`/${id}`}
      style={{
        background: color,
      }}
      className={`sticky-note-base ${rotationClass} text-decoration-none p-3  mb-3 h-100 text-reset`}
    >
      <Card.Title>{title}</Card.Title>
      <Card.Text
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3, // number of lines to show
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {stripHtmlTags(markdown)}
      </Card.Text>
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge key={tag.id} className="text-trauncate ">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
