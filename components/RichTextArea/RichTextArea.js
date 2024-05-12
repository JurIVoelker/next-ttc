import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./RichTextArea.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faArrowRotateRight,
  faBold,
  faItalic,
  faList,
  faParagraph,
  faStrikethrough,
  faTextSlash,
} from "@fortawesome/free-solid-svg-icons";

const RichTextArea = ({ text, setText }) => {
  const content = "<p>Hello World!</p>";

  const extensions = [
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ];

  const editor = useEditor({
    extensions,
    content,
  });

  return (
    <>
      <div className={styles.container}>
        <MenuBar editor={editor}></MenuBar>
        <EditorContent editor={editor} className={styles.content} />
      </div>
    </>
  );
};
export default RichTextArea;

import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Button } from "react-aria-components";

export const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className={styles.menuBar}>
        <Button
          onPress={() => editor.chain().focus().toggleBold().run()}
          isDisabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faBold} />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleItalic().run()}
          isDisabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faItalic} />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleStrike().run()}
          isDisabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </Button>
        <Button onPress={() => editor.chain().focus().unsetAllMarks().run()}>
          <FontAwesomeIcon icon={faTextSlash} />
        </Button>
        <Button
          onPress={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faParagraph} />
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          Überschrift
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          h2
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          h3
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          h4
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          h5
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          h6
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faList} />
        </Button>
        {/** 
        <Button
          onPress={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <svg>
            <path d="M27 14h36v8H27zm0 36h36v8H27zm0-18h36v8H27zM11.8 15.8V22h1.8v-7.8h-1.5l-2.1 1 .3 1.3zm.3 22.7.7-.6c1.1-1 2.1-2.1 2.1-3.4 0-1.4-1-2.4-2.7-2.4-1.1 0-2 .4-2.6.8l.5 1.3c.4-.3 1-.6 1.7-.6.9 0 1.3.5 1.3 1.1 0 .9-.9 1.8-2.6 3.3l-1 .9V40H15v-1.5h-2.9zm1.2 15.4c1-.4 1.4-1 1.4-1.8 0-1.1-.9-1.9-2.6-1.9-1 0-1.9.3-2.4.6l.4 1.3c.3-.2 1-.5 1.6-.5.8 0 1.2.3 1.2.8 0 .7-.8.9-1.4.9h-.7v1.3h.7c.8 0 1.6.3 1.6 1.1 0 .6-.5 1-1.4 1-.7 0-1.5-.3-1.8-.5l-.4 1.4c.5.3 1.3.6 2.3.6 2 0 3.2-1 3.2-2.4 0-1.1-.8-1.8-1.7-1.9z"></path>
          </svg>
        </Button>*/}
        <Button
          onPress={() => editor.chain().focus().setHorizontalRule().run()}
        >
          __
        </Button>
        <Button onPress={() => editor.chain().focus().setHardBreak().run()}>
          hard break
        </Button>
        <Button
          onPress={() => editor.chain().focus().undo().run()}
          isDisabled={!editor.can().chain().focus().undo().run()}
        >
          <FontAwesomeIcon icon={faArrowRotateLeft} />
        </Button>
        <Button
          onPress={() => editor.chain().focus().redo().run()}
          isDisabled={!editor.can().chain().focus().redo().run()}
        >
          <FontAwesomeIcon icon={faArrowRotateRight} />
        </Button>
      </div>
    </>
  );
};
