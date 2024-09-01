import { Button, DropZone, FileTrigger } from "react-aria-components";
import type { FileDropItem } from "react-aria";
import React from "react";
import styles from "./AriaImageDropzone.module.scss";

export default function AriaImageDropzone({ files, setFiles, ...props }) {
  const handleNewFiles = (selectedFiles) => {
    const promises = [];
    const _images = [];
    selectedFiles.forEach((image) => {
      if (image?.kind) {
        promises.push(image.getFile());
      } else {
        _images.push(image);
      }
    });
    Promise.all(promises).then((res) => {
      setFiles((prev) => [...prev, ...res, ..._images]);
    });
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
