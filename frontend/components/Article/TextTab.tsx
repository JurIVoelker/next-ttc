import AriaDatePicker from "../AriaDatePicker/AriaDatePicker";
import AriaTextField from "../AriaTextField/AriaTextField";
import RichTextArea from "../RichTextArea/RichTextArea";
import styles from "./TextTab.module.scss";

export const TextTab = ({ title, setTitle, text, setText, date, setDate }) => {
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
