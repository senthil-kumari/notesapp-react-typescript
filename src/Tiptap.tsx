import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { TextStyleKit } from "@tiptap/extension-text-style";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "dompurify";
import CharacterCount from "@tiptap/extension-character-count";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaHeading,
  FaListOl,
  FaListUl,
  FaUnderline,
  FaUndo,
  FaRedo,
} from "react-icons/fa";

type TiptapProps = {
  setBodyContent: (data: string) => void;
  bodyContent: string;
};

const MAX_CHARACTERS = 2000;
const MenuBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });
  return (
    <div className="menu-bar">
      <div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? "is-active" : ""}
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? "is-active" : ""}
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
          className={editorState.isUnderline ? "is-active" : ""}
        >
          <FaUnderline />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? "is-active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editorState.isHeading1 ? "is-active" : ""}
        >
          <FaHeading />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? "is-active" : ""}
        >
          <FaListUl />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? "is-active" : ""}
        >
          <FaListOl />
        </button>
      </div>
      <div>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          <FaUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
};
const Tiptap = ({ setBodyContent, bodyContent }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyleKit,
      CharacterCount.configure({
        limit: MAX_CHARACTERS,
      }),
    ],
    content: bodyContent,
    onUpdate: ({ editor }) => {
      const rawHtml = editor.getHTML();
      const safeHtml = DOMPurify.sanitize(rawHtml);
      setBodyContent(safeHtml);
    },
  });

  return (
    <>
      <div className="d-flex justify-content-end">
        {editor && (
          <div className="text-muted small">
            {editor.storage.characterCount.characters()}/{MAX_CHARACTERS}{" "}
            characters
          </div>
        )}
      </div>
      <div className="text-editor">
        <MenuBar editor={editor} />
        <div className="tiptap-editor-container">
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
};

export default Tiptap;
