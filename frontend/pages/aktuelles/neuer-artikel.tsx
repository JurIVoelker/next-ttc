import React, { useState } from "react";
import { createArticle } from "../../utils/strapi";
import TabOverview from "../../components/Article/TabOverview";

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

  const [previewText, setPreviewText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [isSuccess, setSuccess] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleConfirm = async () => {
    setIsSending(true);
    const body = {
      titel: title,
      kurzBeschreibung: previewText,
      datum: date,
      text: text,
    };
    try {
      await createArticle(body, images, previewImage, setUploadProgress);
      setIsSending(false);
      setSuccess(true);
    } catch (error) {
      setErrorMessage(error?.message || "fehler");
      setIsSending(false);
    }
  };

  const isValid = title !== "" && !!date && text !== emptyTextAreaContent;

  return (
    <>
      <TabOverview
        isSending={isSending}
        handleConfirm={handleConfirm}
        isSuccess={isSuccess}
        tab={tab}
        setTab={setTab}
        text={text}
        setText={setText}
        title={title}
        setTitle={setTitle}
        date={date}
        setDate={setDate}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        images={images}
        setImages={setImages}
        isValid={isValid}
        setPreviewText={setPreviewText}
        errorMessage={errorMessage}
        uploadProgress={uploadProgress}
      />
    </>
  );
};

export default NewPage;
