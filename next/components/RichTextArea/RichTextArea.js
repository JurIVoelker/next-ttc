import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./RichTextArea.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faArrowRotateRight,
  faBold,
  faHeading,
  faItalic,
  faList,
  faParagraph,
  faStrikethrough,
  faTextSlash,
} from "@fortawesome/free-solid-svg-icons";

const RichTextArea = ({ text, setText }) => {
  const content = text;

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

  const handleUpdate = (e) => {
    const content =
      e.editor.contentComponent.editorContentRef.current.querySelector(
        ".ProseMirror"
      ).innerHTML;
    setText(content);
  };

  const editor = useEditor({
    extensions,
    content,
    onUpdate: handleUpdate,
  });

  return (
    <>
      <div className={styles.container}>
        <MenuBar editor={editor}></MenuBar>
        <EditorContent
          editor={editor}
          className={styles.content}
          content={text}
        />
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
          className={editor.isActive("bold") ? styles.isActive : ""}
        >
          <FontAwesomeIcon icon={faBold} />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleItalic().run()}
          isDisabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? styles.isActive : ""}
        >
          <FontAwesomeIcon icon={faItalic} />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleStrike().run()}
          isDisabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? styles.isActive : ""}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </Button>
        <Button onPress={() => editor.chain().focus().unsetAllMarks().run()}>
          <FontAwesomeIcon icon={faTextSlash} />
        </Button>
        <Button
          onPress={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? styles.isActive : ""}
        >
          <FontAwesomeIcon icon={faParagraph} />
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? styles.isActive : ""
          }
        >
          <FontAwesomeIcon icon={faHeading} style={{ height: "15px" }} />
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? styles.isActive : ""
          }
        >
          <FontAwesomeIcon icon={faHeading} />
        </Button>

        <Button
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? styles.isActive : ""}
        >
          <FontAwesomeIcon icon={faList} />
        </Button>
        <Button
          onPress={() => editor.chain().focus().setHorizontalRule().run()}
        >
          __
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
