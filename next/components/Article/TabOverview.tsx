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
  tabs = ["Text", "Bilder", "Vorschau"],
}) => {
  return (
    <>
      {isSuccess && (
        <>
          <h3 style={{ marginTop: "32px" }}>Erfolg</h3>
          <p style={{ marginTop: "16px" }}>
            Dein Artikel wurde erfolgreich{" "}
            {tabs[1] === "Vorschau" ? "bearbeitet" : "hochgeladen"}
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
              {tabs.map((tab) => (
                <Tab id={tab} key={tab} className={styles.tabSection}>
                  {tab}
                </Tab>
              ))}
            </TabList>

            <TabPanel id="Text">
              <TextTab
                text={text}
                setText={setText}
                title={title}
                setTitle={setTitle}
                date={date}
                setDate={setDate}
              />
            </TabPanel>
            {tabs[1] !== "Vorschau" && (
              <TabPanel id="Bilder">
                <ImageTab
                  preview={previewImage}
                  setPreview={setPreviewImage}
                  images={images}
                  setImages={setImages}
                />
              </TabPanel>
            )}
            <TabPanel id="Vorschau">
              <PreviewTab
                preview={previewImage}
                title={title}
                text={text}
                isValid={isValid}
                date={date}
                setPreviewText={setPreviewText}
                errorMessage={errorMessage}
                isSending={isSending}
              />
            </TabPanel>
          </Tabs>
          <div className={styles.buttonGroup}>
            {tab === "Text" && !isSending ? (
              <Link href="/aktuelles" className={styles.abortButton}>
                Abbrechen
              </Link>
            ) : (
              <Button
                className={styles.abortButton}
                onPress={() => {
                  if (tab === "Vorschau")
                    setTab([tabs[1] === "Vorschau" ? tabs[0] : "Bilder"]);
                  else if (tab === "Bilder") setTab("Text");
                }}
              >
                Zurück
              </Button>
            )}
            <Button
              className={styles.continueButton}
              onPress={() => {
                if (tab === "Text") setTab(tabs[1]);
                else if (tab === "Bilder") setTab("Vorschau");
                else if (tab === "Vorschau") handleConfirm();
              }}
              isDisabled={tab === "Vorschau" && !isValid && !isSending}
            >
              {isSending ? (
                <>
                  <PulseLoader color="white" />
                </>
              ) : (
                <>
                  {tab === "Vorschau"
                    ? tabs[1] === "Vorschau"
                      ? "Artikel bearbeiten"
                      : "Artikel erstellen"
                    : "Weiter"}
                </>
              )}
            </Button>
          </div>
          {isSending && tabs[1] !== "Vorschau" && (
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
