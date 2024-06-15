import React, { useState } from "react";
import { editArticle, getRequest } from "../../utils/strapi";
import { Articles } from "../../types/globalTypes";
import TabOverview from "../../components/Article/TabOverview";
import { parseDate } from "@internationalized/date";

const emptyTextAreaContent = '<p><br class="ProseMirror-trailingBreak"></p>';

const EditPage = ({ postData }) => {
  const [tab, setTab] = useState("text");
  /* Text Tab */
  const [title, setTitle] = useState(postData?.attributes?.titel);
  const [date, setDate] = useState(parseDate(postData.attributes.datum));
  const [text, setText] = useState(postData.attributes.text);

  /* Image Tab */
  const [previewImage, setPreviewImage] = useState(
    postData.attributes.vorschauBild || false
  );
  const [images, setImages] = useState(null);

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
    editArticle(body, postData.id).then((res) => {
      setIsSending(false);
      if ((res as any).error) {
        if ((res as any) === "slug must be unique") {
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
        tabs={["Text", "Vorschau"]}
      />
    </>
  );
};

export default EditPage;

export const getStaticPaths = async () => {
  const articles: Articles = await getRequest("articles");
  const paths = articles.data.map((article) => {
    return { params: { slug: article.attributes.slug } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

interface Context {
  params: {
    slug: string;
  };
}

export const getStaticProps = async (context: Context) => {
  const slug = context.params.slug;
  const post = await getRequest(
    `articles?filters[slug][$eq]=${slug}&populate=deep`
  );
  return { props: { postData: post.data[0] } };
};
