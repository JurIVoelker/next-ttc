import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Button,
  DatePicker,
  FieldError,
  Input,
  Label,
  Link,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TextField,
} from "react-aria-components";
import styles from "./neuer-artikel.module.scss";
import AriaTextField from "../../components/AriaTextField/AriaTextField";
import AriaDatePicker from "../../components/AriaDatePicker/AriaDatePicker";

import RichTextArea from "../../components/RichTextArea/RichTextArea";
import AriaImageDropzone from "../../components/AriaImageDropzone/AriaImageDropzone";
import Image from "next/image";
import Card from "../../components/Card/Card";

const emptyTextAreaContent = '<p><br class="ProseMirror-trailingBreak"></p>';

const NewPage = () => {
  const [tab, setTab] = useState("text");

  /* Text Tab */
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(false);
  const [text, setText] = useState("");

  /* Image Tab */
  const [previewImage, setPreviewImage] = useState(false);
  const [images, setImages] = useState([]);

  const handleConfirm = () => {};

  const isValid =
    title !== "" && !!date && text !== emptyTextAreaContent && !!previewImage;

  return (
    <Layout>
      <Tabs
        selectedKey={tab}
        onSelectionChange={(e: string) => {
          setTab(e);
        }}
        className={styles.tabs}
      >
        <TabList aria-label="Inhalt tabs" className={styles.tabList}>
          <Tab id="text" className={styles.tabSection}>
            Text
          </Tab>
          <Tab id="images" className={styles.tabSection}>
            Bilder
          </Tab>
          <Tab id="preview" className={styles.tabSection}>
            Vorschau
          </Tab>
        </TabList>

        <TabPanel id="text">
          <TextTab
            text={text}
            setText={setText}
            title={title}
            setTitle={setTitle}
            date={date}
            setDate={setDate}
          />
        </TabPanel>
        <TabPanel id="images">
          <ImageTab
            preview={previewImage}
            setPreview={setPreviewImage}
            images={images}
            setImages={setImages}
          />
        </TabPanel>
        <TabPanel id="preview">
          <PreviewTab
            preview={previewImage}
            images={images}
            title={title}
            text={text}
            isValid={isValid}
            date={date}
          />{" "}
        </TabPanel>
      </Tabs>
      <div className={styles.buttonGroup}>
        {tab === "text" ? (
          <Link href="/aktuelles" className={styles.abortButton}>
            Abbrechen
          </Link>
        ) : (
          <Button
            className={styles.abortButton}
            onPress={() => {
              if (tab === "preview") setTab("images");
              else if (tab === "images") setTab("text");
            }}
          >
            Zurück
          </Button>
        )}
        <Button
          className={styles.continueButton}
          onPress={() => {
            if (tab === "text") setTab("images");
            else if (tab === "images") setTab("preview");
            else if (tab === "preview") handleConfirm();
          }}
          isDisabled={tab === "preview" && !isValid}
        >
          {tab === "preview" ? "Artikel erstellen" : "Weiter"}
        </Button>
      </div>
    </Layout>
  );
};

const TextTab = ({ title, setTitle, text, setText, date, setDate }) => {
  return (
    <>
      <h3 style={{ marginTop: "32px" }}>Textinhalte eingeben</h3>
      <div className={styles.textInput}>
        <AriaTextField
          value={title}
          setValue={setTitle}
          label="Titel"
          className={styles.textField}
        ></AriaTextField>
        <AriaDatePicker
          setDate={setDate}
          date={date}
          className={styles.datePicker}
        />
      </div>
      <RichTextArea text={text} setText={setText} />
    </>
  );
};

const ImageTab = ({ images, setImages, preview, setPreview }) => {
  const handleSelectImage = (image) => {
    setPreview(image);
  };
  return (
    <>
      <h3 style={{ marginTop: "32px" }}>Bilder und Vorschaubild auswählen</h3>
      <div
        className={`${styles.imageSelectWrapper} ${
          images.length === 0 ? styles.noImages : ""
        }`}
      >
        {images.length > 0 && (
          <div className={styles.imageGrid}>
            {images.map((image) => {
              const imageUrl = URL.createObjectURL(image);
              return (
                <Button
                  className={`${styles.imageContainer} ${
                    preview && image.name === preview.name
                      ? styles.selectedImage
                      : ""
                  }`}
                  onPress={() => {
                    handleSelectImage(image);
                  }}
                  key={image.name}
                >
                  <Image
                    src={imageUrl}
                    alt="Hinzugefügte Bilder"
                    width={100}
                    height={100}
                  />
                  <p>{image.name}</p>
                </Button>
              );
            })}
          </div>
        )}
        <div className={styles.sidePanel}>
          <AriaImageDropzone
            files={images}
            setFiles={setImages}
            className={styles.imageDropzone}
          />
          {preview && (
            <div className={styles.previewWrapper}>
              <p>Artikel-Vorschau-Bild:</p>
              <Image
                src={URL.createObjectURL(preview)}
                width={100}
                height={100}
                alt="Vorschaubild"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const PreviewTab = ({ preview, date, title, text, isValid }) => {
  let onlyText = "";
  let isHTMLTag = false;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "<") {
      isHTMLTag = true;
    } else if (text[i] === ">") {
      isHTMLTag = false;
      onlyText += " ";
    } else if (!isHTMLTag) {
      onlyText += text[i];
    }
  }
  const shortenedText = onlyText.substring(0, 100) + "...";
  const addZeros = (number) => {
    return String(number).length === 1 ? "0" + number : number;
  };
  const formattedDate = `${date.year}-${addZeros(date.month)}-${addZeros(
    date.day
  )}`;
  return (
    <div>
      <div className={styles.cardContainer}>
        {isValid && (
          <>
            <h3 style={{ marginBottom: "16px" }}>Vorschau</h3>
            <Card
              description={shortenedText}
              imageUrl={URL.createObjectURL(preview)}
              title={title}
              date={formattedDate}
            ></Card>
          </>
        )}
      </div>
      {!isValid && (
        <div>
          <h3>Artikel nicht gültig</h3>
          <ul className={styles.errorList}>
            {!title && <li>Bitte gebe einen Titel ein (Text)</li>}
            {!date && <li>Bitte gebe ein Datum ein (Text)</li>}
            {shortenedText === "..." && (
              <li>Bitte gebe einen Artikeltext ein (Text)</li>
            )}
            {!preview && (
              <li>
                Bitte lade mindestens ein Bild hoch und wähle ein Vorschaubild
                aus (Bilder)
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewPage;
