import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
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

  const handleConfirm = () => {
    setIsSending(true);
    const body = {
      titel: title,
      kurzBeschreibung: previewText,
      datum: date,
      text: text,
    };
    createArticle(body, images, previewImage, setUploadProgress).then((res) => {
      setIsSending(false);
      if (res.error) {
        if (res.error === "slug must be unique") {
          setErrorMessage(
            `Bitte wähle einen anderen Titel! "${title}" ist bereits vergeben!`
          );
        }
      } else {
        setErrorMessage("");
        setSuccess(true);
      }
    });
  };

  const isValid = title !== "" && !!date && text !== emptyTextAreaContent;

  return (
    <Layout>
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
    </Layout>
  );
};

export default NewPage;
