"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import { useEffect, useState } from "react";
import {
  BulletListIcon,
  CenterTextIcon,
  ItalicIcon,
  OrderedListIocn,
  RightTextIcon,
} from "./ui/Icons";

interface DescriptionEditorProps {
  description: string;
  onChange: (html: string) => void;
}

const DescriptionEditor: React.FC<DescriptionEditorProps> = ({
  description,
  onChange,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Paragraph,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: description || "<p>Write your description here...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[600px] p-4 rounded-md w-full",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentHTML = editor.getHTML();
    if (description !== currentHTML) {
      editor.commands.setContent(description, false);
    }
  }, [description, editor]);

  if (!mounted || !editor) return null;

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Toolbar */}
      <div className="flex gap-2 border border-transparent px-2 rounded-md ">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`text-black text-xl font-bold ${
            editor.isActive("bold") ? "bg-gray-200" : ""
          }`}
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`text-black italic ${
            editor.isActive("italic") ? "bg-gray-200" : ""
          }`}
        >
          <span>
            <ItalicIcon />
          </span>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`text-black text-xl underline ${
            editor.isActive("underline") ? "bg-gray-200" : ""
          }`}
        >
          U
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`px-1 text-sm ${
            editor.isActive({ textAlign: "left" })
              ? "text-black"
              : "text-gray-500"
          }`}
        >
          <span className="font-bold text-2xl text-black">≡</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`px-1 text-sm ${
            editor.isActive({ textAlign: "center" })
              ? "text-black"
              : "text-gray-500"
          }`}
        >
          <span className="font-bold text-base text-black">
            <CenterTextIcon />
          </span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`px-1 text-sm ${
            editor.isActive({ textAlign: "right" })
              ? "text-black"
              : "text-gray-500"
          }`}
        >
          <span>
            <RightTextIcon />
          </span>
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`text-black ${
            editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
          }`}
        >
          H1
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`text-black ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
          }`}
        >
          H2
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`text-black ${
            editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""
          }`}
        >
          H3
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`text-black ${
            editor.isActive("bulletList") ? "bg-gray-200" : ""
          }`}
        >
          <span>
            <BulletListIcon />
          </span>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`text-black ${
            editor.isActive("orderedList") ? "bg-gray-200" : ""
          }`}
        >
          <span>
            <OrderedListIocn />
          </span>
        </button>
      </div>

      <hr />

      {/* The actual editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default DescriptionEditor;
