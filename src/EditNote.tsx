import type { NoteData, Tag } from "./App";
import { NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";
type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};
export default function EditNote({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps) {
  const note = useNote();
  return (
    <>
      <h2 className="mb-4">Edit Note</h2>
      <NoteForm
        title={note.title}
        color={note.color}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
        successMessage="Note updated successfully"
      />
    </>
  );
}
