import Link from "next/link";
import styles from "./TabOverview.module.scss";
import { Button, Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import { PulseLoader } from "react-spinners";
import { TextTab } from "./TextTab";
import { ImageTab } from "./ImageTab";
import { PreviewTab } from "./PreviewTab";

const TabOverview = ({
  isSending,
  handleConfirm,
  isSuccess,
  tab,
  setTab,
  text,
  setText,
  title,
  setTitle,
  date,
  setDate,
  previewImage,
  setPreviewImage,
  images,
  setImages,
  isValid,
  setPreviewText,
  errorMessage,
  uploadProgress,
}) => {
  return (
    <>
      {isSuccess && (
        <>
          <h3 style={{ marginTop: "32px" }}>Erfolg</h3>
          <p style={{ marginTop: "16px" }}>
            Dein Artikel wurde erfolgreich hochgeladen
          </p>
          <Link href="/aktuelles" className={styles.button}>
            Zurück zur Übersicht
          </Link>
        </>
      )}
      {!isSuccess && (
        <>
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
                title={title}
                text={text}
                isValid={isValid}
                date={date}
                setPreviewText={setPreviewText}
                errorMessage={errorMessage}
                isSending={isSending}
              />{" "}
            </TabPanel>
          </Tabs>
          <div className={styles.buttonGroup}>
            {tab === "text" && !isSending ? (
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
              isDisabled={tab === "preview" && !isValid && !isSending}
            >
              {isSending ? (
                <>
                  <PulseLoader color="white" />
                </>
              ) : (
                <>{tab === "preview" ? "Artikel erstellen" : "Weiter"}</>
              )}
            </Button>
          </div>
          {isSending && (
            <p>{`Bilder hochgeladen: ${uploadProgress}/${
              images.length + 1
            }`}</p>
          )}
        </>
      )}
    </>
  );
};

export default TabOverview;
