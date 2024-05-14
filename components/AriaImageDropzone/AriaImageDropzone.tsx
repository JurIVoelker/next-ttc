import { Button, DropZone, FileTrigger, Text } from "react-aria-components";
import type { FileDropItem } from "react-aria";
import { useState } from "react";
import React from "react";
import styles from "./AriaImageDropzone.module.scss";

export default function AriaImageDropzone({ files, setFiles, ...props }) {
  const handleNewFiles = (selectedFiles) => {
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  return (
    <DropZone
      onDrop={(e) => {
        let files = e.items.filter(
          (file) => file.kind === "file"
        ) as FileDropItem[];
        handleNewFiles(files);
      }}
      className={`${styles.dropzone} ${props.className ? props.className : ""}`}
    >
      <FileTrigger
        allowsMultiple
        onSelect={(e) => {
          let files = Array.from(e);
          handleNewFiles(files);
        }}
      >
        <Button>Dateien auswählen</Button>
        <p style={{ textAlign: "center", maxWidth: "90%" }}>
          oder in dem Bereich ablegen
        </p>
      </FileTrigger>
    </DropZone>
  );
}
