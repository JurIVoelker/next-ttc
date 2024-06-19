import { Button, DropZone, FileTrigger } from "react-aria-components";
import type { FileDropItem } from "react-aria";
import React from "react";
import styles from "./AriaImageDropzone.module.scss";

export default function AriaImageDropzone({ files, setFiles, ...props }) {
  const handleNewFiles = (selectedFiles) => {
    Promise.all(
      selectedFiles.map((file) => {
        if (typeof selectedFiles?.kind) {
          file.getFile().then((res) => {
            return res;
          });
        } else {
          return file;
        }
      })
    ).then((res) => {
      console.log(res);
    });

    // setFiles((prev) => [...prev, ...selectedFiles]);
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
