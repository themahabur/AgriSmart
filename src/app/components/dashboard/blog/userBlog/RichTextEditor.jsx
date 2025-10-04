"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  FiBold,
  FiItalic,
  FiStrikethrough,
  FiCode,
  FiList,
  FiTrendingUp,
} from "react-icons/fi";

// The Toolbar for the editor
const Toolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 bg-gray-50 rounded-t-lg">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded ${
          editor.isActive("bold")
            ? "bg-green-100 text-green-700"
            : "hover:bg-gray-200"
        }`}
      >
        <FiBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${
          editor.isActive("italic")
            ? "bg-green-100 text-green-700"
            : "hover:bg-gray-200"
        }`}
      >
        <FiItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded ${
          editor.isActive("strike")
            ? "bg-green-100 text-green-700"
            : "hover:bg-gray-200"
        }`}
      >
        <FiStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded ${
          editor.isActive("codeBlock")
            ? "bg-green-100 text-green-700"
            : "hover:bg-gray-200"
        }`}
      >
        <FiCode />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${
          editor.isActive("bulletList")
            ? "bg-green-100 text-green-700"
            : "hover:bg-gray-200"
        }`}
      >
        <FiList />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded ${
          editor.isActive("heading", { level: 2 })
            ? "bg-green-100 text-green-700"
            : "hover:bg-gray-200"
        }`}
      >
        <FiTrendingUp />
      </button>
    </div>
  );
};

// The main editor component
const RichTextEditor = ({ content, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // You can configure which extensions from the starter kit you want to use
        heading: {
          levels: [2, 3], // Only allow H2 and H3
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    // This part is key for styling the editor content itself
    editorProps: {
      attributes: {
        class:
          "prose prose-green max-w-none w-full px-4 py-3 border-b border-x border-gray-300 rounded-b-lg min-h-[300px] focus:outline-none font-hind text-lg",
      },
    },
  });

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
