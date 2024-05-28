import { getStrapiImage } from "../../utils/strapi";
import Card from "../Card/Card";
import styles from "./PreviewTab.module.scss";
export const PreviewTab = ({
  preview,
  date,
  title,
  text,
  isValid,
  setPreviewText,
  errorMessage,
  isSending,
}) => {
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
  setPreviewText(shortenedText);
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
              imageUrl={
                preview.data
                  ? getStrapiImage(preview)
                  : URL.createObjectURL(preview)
              }
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
      {errorMessage && !isSending && (
        <div className={styles.error}>{errorMessage}</div>
      )}
    </div>
  );
};
