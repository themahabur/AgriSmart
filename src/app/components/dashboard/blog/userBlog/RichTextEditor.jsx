"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Link from "@tiptap/extension-link";
import { useCallback } from "react";
import {
  FiBold,
  FiItalic,
  FiCode,
  FiList,
  FiTrendingUp,
  FiLink,
  FiYoutube,
  FiImage,
  FiMinus,
  FiArrowUp,
  FiArrowDown,
  FiRotateCcw,
  FiRotateCw,
  FiCodesandbox,
} from "react-icons/fi";
import { BiUnlink } from "react-icons/bi";
import { MdStrikethroughS } from "react-icons/md";
import Placeholder from "@tiptap/extension-placeholder";

// Reusable Toolbar Button for cleaner code
const ToolbarButton = ({ onClick, disabled, isActive, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 rounded transition-colors ${
      isActive
        ? "bg-green-100 text-green-700"
        : "hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent"
    }`}
  >
    {children}
  </button>
);

// The enhanced Toolbar
const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return; // User cancelled
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border border-gray-300 bg-gray-50 rounded-t-lg">
      <ToolbarButton
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        <FiBold />
      </ToolbarButton>
      <ToolbarButton
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      >
        <FiItalic />
      </ToolbarButton>
      <ToolbarButton
        title="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
      >
        <MdStrikethroughS />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <ToolbarButton
        title="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
      >
        <FiTrendingUp />
      </ToolbarButton>
      <ToolbarButton
        title="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      >
        <FiList />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <ToolbarButton
        title="Add Link"
        onClick={setLink}
        disabled={editor.state.selection.empty}
      >
        <FiLink />
      </ToolbarButton>
      <ToolbarButton
        title="Remove Link"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
      >
        <BiUnlink />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <ToolbarButton
        title="Code Block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
      >
        <FiCodesandbox />
      </ToolbarButton>
      <ToolbarButton
        title="Horizontal Rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <FiMinus />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <ToolbarButton
        title="Undo"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <FiRotateCcw />
      </ToolbarButton>
      <ToolbarButton
        title="Redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <FiRotateCw />
      </ToolbarButton>
    </div>
  );
};

// The main editor component
const RichTextEditor = ({ content, onUpdate, className }) => {
  const editor = useEditor({
    // KEY FIX: Prevents SSR hydration mismatch errors.
    immediatelyRender: false,

    extensions: [
      StarterKit,
      // FEATURE: Adds a placeholder when the editor is empty.
      Placeholder.configure({
        placeholder: "আপনার জ্ঞান এখানে লিখুন...",
      }),
      // FEATURE: Adds link support.
      Link.configure({
        openOnClick: false, // Don't open link on click in the editor
        autolink: true, // Automatically detect links from pasted text
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        // REUSABILITY: Use a passed className or a default, styled with Tailwind Typography.
        class:
          className ||
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
