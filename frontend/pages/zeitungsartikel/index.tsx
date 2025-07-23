import AiAssistantChat from "@/components/AiAssistantChat/AiAssistantChat";
import CheckboxWithLabel from "@/components/checkbox-with-label";
import Dropzone from "@/components/dropzone";
import MarkdownTextArea from "@/components/MarkdownTextArea/MarkdownTextArea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import {
  FileUploadState,
  FileWithPreview,
  useFileUpload,
} from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import {
  createArticle,
  getRequest,
  publicStrapiUrl,
  publicStrapiUrl as STRAPI_URL,
  uploadArticleImage,
} from "@/utils/strapi";
import { Loader2, OctagonAlert } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { useDebounce } from "use-debounce";
import z from "zod";

const steps = [
  {
    step: 1,
    title: "Text",
  },
  {
    step: 2,
    title: "Bilder",
  },
  {
    step: 3,
    title: "Prüfen und Veröffentlichen",
  },
];

const ZeitungsArtikelPage = () => {
  const [step, setStep] = useState(1);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    article: 0,
    newspaperArticle: 0,
  });
  const [unAcceptedMessage, setUnAcceptedMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [draftData, setDraftData] = useState<{ id: number } | null>(null);

  const { push } = useRouter();

  const [debouncedSlug] = useDebounce(slugify(title), 500);

  useEffect(() => {
    const ERROR_MESSAGE = "Artikel mit diesem Titel existiert bereits.";
    (async () => {
      if (!debouncedSlug || draftData) return;
      const articles = await getRequest(
        "articles?publicationState=preview&filters[slug][$eq]=" + debouncedSlug
      );
      if (articles.data.length > 0) {
        setError(ERROR_MESSAGE);
      } else if (error === ERROR_MESSAGE) {
        setError(null);
      }
    })();
  }, [debouncedSlug]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const slug = query.get("slug");
    (async () => {
      const response = await getRequest(
        "articles?publicationState=preview&filters[slug][$eq]=" + slug,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
          },
        }
      );
      const data = response.data;
      if (data.length > 0) {
        setText(data[0].attributes.text);
        setTitle(data[0].attributes.titel);
        setDraftData({ id: data[0].id });
      }
    })();
  }, []);

  const [saveSettings, setSaveSettings] = useState({
    website: {
      checked: true,
    },
    newsPaper: {
      checked: true,
    },
  });

  const rawTextLength = (
    isLoading ? text : unAcceptedMessage || text
  ).replaceAll(/<[^>]*>/g, "").length;
  const maxLength = 2000;

  const [data, handlers] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    multiple: true,
  });

  const dataSchema = z.object({
    text: z.string().min(1, "Text ist erforderlich"),
    title: z.string().min(1, "Titel ist erforderlich"),
  });

  const validatedData = dataSchema.safeParse({ text, title });

  useEffect(() => {
    if (text != "" && unAcceptedMessage) {
      setUnAcceptedMessage("");
    }
  }, [text]);

  const makeAiRequest = async (task: string) => {
    setUnAcceptedMessage(task);
    setIsLoading(true);
    try {
      const response = await fetch(STRAPI_URL + "/api/ai-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
        body: JSON.stringify({
          text,
          task,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()).data;
      let title = "";
      let content = "";
      try {
        const parsedData = JSON.parse(data);
        title = parsedData.title || "";
        content = parsedData.text || "";
      } catch {
        content = data;
      }
      setUnAcceptedMessage(content);
      setTitle(title);
    } catch (error) {
      console.error("Error making AI request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadArticle = async (data: {
    title: string;
    text: string;
    titleImage: FileWithPreview;
    images: FileWithPreview[];
  }) => {
    try {
      setError(null);
      setIsLoading(true);
      const body = {
        titel: data.title,
        kurzBeschreibung: data.text.substring(0, 100) + "...",
        datum: new Date(),
        text: data.text,
      };

      const images = data.images.map((file) => file.file);
      const previewImage = data.titleImage.file;

      try {
        await createArticle(
          body,
          images,
          previewImage,
          (progress: number) => {
            setUploadProgress((prev) => ({
              ...prev,
              article: progress,
            }));
          },
          {
            draftData,
          }
        );
      } catch (error) {
        setError(error?.message || "Fehler beim Hochladen des Artikels");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading article:", error);
      setError("Fehler beim Hochladen des Artikels");
      setIsLoading(false);
    }
    console.log("Artikel erfolgreich hochgeladen!");
    setUploadProgress((prev) => ({
      ...prev,
      article: 100,
    }));
    setIsLoading(false);
  };

  const uploadNewsPaperArticle = async (data: {
    title: string;
    text: string;
    images: FileWithPreview[];
  }) => {
    try {
      setIsLoading(true);
      let rawUploadedData = [];
      for (const file of data.images) {
        const uploadedFile = await uploadArticleImage(file.file, 0, "images");
        rawUploadedData.push(uploadedFile);
      }

      const uploadedImageUrls = rawUploadedData.map(
        (file) => publicStrapiUrl + (file?.data[0]?.url || "")
      );

      const res = await fetch(publicStrapiUrl + "/api/news-paper-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
        body: JSON.stringify({
          title: data.title,
          text: data.text,
          images: uploadedImageUrls,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res?.status}`);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading newspaper article:", error);
      setError("Fehler beim Hochladen des Zeitungsartikels");
      setIsLoading(false);
      return;
    }
    setUploadProgress((prev) => ({
      ...prev,
      newspaperArticle: 100,
    }));
    console.log("Zeitungsartikel erfolgreich hochgeladen!");
    setIsLoading(false);
  };

  const saveAsDraft = async (data: { title: string; text: string }) => {
    setError(null);
    setIsLoading(true);
    const body = {
      titel: data.title,
      kurzBeschreibung: data.text.substring(0, 100) + "...",
      datum: new Date(),
      text: data.text,
    };

    try {
      await createArticle(body, [], null, () => {}, {
        saveAsDraft: true,
        draftData,
      });
    } catch (error) {
      setError(error?.message || "Fehler beim Hochladen des Artikels");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    push("/aktuelles");
  };

  return (
    <>
      <Stepper value={step} className="mb-8">
        {steps.map(({ step, title }) => (
          <StepperItem
            key={step}
            step={step}
            className="relative flex-1 flex-col!"
            onClick={() => setStep(step)}
            disabled={isLoading}
          >
            <StepperTrigger className="flex-col gap-3 rounded">
              <StepperIndicator />
              <StepperTitle>{title}</StepperTitle>
            </StepperTrigger>
            {step < steps.length && (
              <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
            )}
          </StepperItem>
        ))}
      </Stepper>

      {step === 1 && (
        <TextStep
          text={text}
          setText={setText}
          title={title}
          setTitle={setTitle}
          isLoading={isLoading}
          unAcceptedMessage={unAcceptedMessage}
          setUnAcceptedMessage={setUnAcceptedMessage}
          rawTextLength={rawTextLength}
          maxLength={maxLength}
          makeAiRequest={makeAiRequest}
          nextStep={() => setStep(2)}
          saveAsDraft={saveAsDraft}
        />
      )}
      {step === 2 && (
        <ImageStep
          data={data}
          handlers={handlers}
          nextStep={() => setStep(3)}
          prevStep={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <>
          <CheckStep
            uploadArticle={uploadArticle}
            uploadNewsPaperArticle={uploadNewsPaperArticle}
            validatedData={validatedData}
            saveSettings={saveSettings}
            setSaveSettings={setSaveSettings}
            imageData={data}
            isLoading={isLoading}
            uploadProgress={uploadProgress}
          />
        </>
      )}

      {error && (
        <div className="text-red-700 bg-red-50 p-4 mt-8 rounded-md">
          {error}
        </div>
      )}
    </>
  );
};

export default ZeitungsArtikelPage;

const TextStep = ({
  text,
  setText,
  title,
  setTitle,
  isLoading,
  unAcceptedMessage,
  setUnAcceptedMessage,
  rawTextLength,
  maxLength,
  makeAiRequest,
  nextStep,
  saveAsDraft,
}: {
  text: string;
  setText: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
  isLoading: boolean;
  unAcceptedMessage: string;
  setUnAcceptedMessage: (value: string) => void;
  rawTextLength: number;
  maxLength: number;
  makeAiRequest: (task: string) => Promise<void>;
  nextStep: () => void;
  saveAsDraft: (data: { title: string; text: string }) => void;
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="flex flex-col w-full">
          <Input
            className="mb-4"
            placeholder="Titel des Artikels"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
          <MarkdownTextArea
            value={isLoading ? text : unAcceptedMessage || text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <AiAssistantChat
          isLoading={isLoading}
          isText={rawTextLength > 0}
          isTooLong={rawTextLength > maxLength}
          unAcceptedMessage={unAcceptedMessage}
          handleConfirmRevertMessage={(confirm) => {
            if (confirm) setText(unAcceptedMessage);
            setUnAcceptedMessage("");
          }}
          makeAiRequest={makeAiRequest}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div className="bg-slate-100 px-4 py-2 w-fit rounded-lg text-sm">
          Zeichen: {rawTextLength} / {maxLength}
        </div>
        <div className="space-x-2">
          <Button onClick={() => saveAsDraft({ title, text })}>
            Entwurf speichern
          </Button>
          <Button disabled>Zurück</Button>
          <Button onClick={nextStep}>Weiter</Button>
        </div>
      </div>
    </>
  );
};

const ImageStep = ({ data, handlers, nextStep, prevStep }) => {
  return (
    <>
      <div>
        <div className="w-full h-full">
          <Dropzone data={data} handlers={handlers} />
        </div>
        <div className="flex justify-end space-x-2 mt-4 w-full">
          <Button onClick={prevStep}>Zurück</Button>
          <Button onClick={nextStep}>Weiter</Button>
        </div>
      </div>
    </>
  );
};

const CheckStep = ({
  validatedData,
  saveSettings,
  setSaveSettings,
  imageData,
  uploadArticle,
  uploadNewsPaperArticle,
  isLoading,
  uploadProgress,
}: {
  validatedData: z.SafeParseReturnType<
    {
      title?: string;
      text?: string;
    },
    {
      title?: string;
      text?: string;
    }
  >;
  saveSettings: {
    website: {
      checked: boolean;
    };
    newsPaper: {
      checked: boolean;
    };
  };
  setSaveSettings: (value: any) => void;
  imageData: FileUploadState;
  uploadArticle: (data: {
    title: string;
    text: string;
    titleImage: FileWithPreview;
    images: FileWithPreview[];
  }) => Promise<void>;
  uploadNewsPaperArticle: (data: {
    title: string;
    text: string;
    images: FileWithPreview[];
  }) => Promise<void>;
  isLoading: boolean;
  uploadProgress: {
    article: number;
    newspaperArticle: number;
  };
}) => {
  const [finishStep, setFinishStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<FileWithPreview | null>(
    null
  );
  const [newsPaperImages, setNewsPaperImages] = useState<FileWithPreview[]>([]);

  useEffect(() => {
    (async () => {
      if (finishStep === 4) {
        if (saveSettings.website.checked) {
          await uploadArticle({
            title: validatedData.data.title,
            text: validatedData.data.text,
            titleImage: selectedImage,
            images: imageData.files,
          });
        }
        if (saveSettings.newsPaper.checked) {
          await uploadNewsPaperArticle({
            title: validatedData.data.title,
            text: validatedData.data.text,
            images: newsPaperImages,
          });
        }
      }
    })();
  }, [finishStep]);
  return (
    <div>
      {finishStep === 1 && (
        <>
          {!validatedData?.success && (
            <div className="flex justify-center">
              <ZodIssueWarning validatedData={validatedData} />
            </div>
          )}
          {validatedData?.success && (
            <div className="flex justify-center">
              <div className="max-w-md space-y-4 border rounded-lg">
                <div className="border-b bg-gray-50 p-4 rounded-t-lg">
                  <h1 className="text-lg font-semibold">
                    Veröffentlichungskanäle auswählen
                  </h1>
                </div>
                <div className="p-4 space-y-2">
                  <CheckboxWithLabel
                    title="Webseite"
                    description="Artikel auf dieser Website veröffentlichen"
                    onChange={() => {
                      setSaveSettings((prev) => ({
                        ...prev,
                        website: {
                          ...prev.website,
                          checked: !prev.website.checked,
                        },
                      }));
                    }}
                    value={saveSettings.website.checked}
                  />
                  <CheckboxWithLabel
                    title="Zeitung"
                    description="Artikel in das Südpfalzkurier-CMS hochladen"
                    onChange={() => {
                      setSaveSettings((prev) => ({
                        ...prev,
                        newsPaper: {
                          ...prev.newsPaper,
                          checked: !prev.newsPaper.checked,
                        },
                      }));
                    }}
                    value={saveSettings.newsPaper.checked}
                  />
                  <Button
                    className="mt-2"
                    onClick={() => {
                      if (saveSettings.website.checked) setFinishStep(2);
                      else if (saveSettings.newsPaper.checked) setFinishStep(3);
                      else setFinishStep(4);
                    }}
                  >
                    Weiter
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {finishStep === 2 && (
        <div>
          <h1 className="text-2xl font-semibold">
            Titelbild für den Webseiteartikel
          </h1>
          <p className="text-muted-foreground mb-6">
            Bitte wähle ein Titelbild für den Webseiteartikel aus.
          </p>
          {imageData.files.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {imageData.files.map((file) => (
                <div className="relative" key={file.id}>
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className={cn(
                      "mb-4 rounded-lg size-60 object-cover",
                      selectedImage?.id === file.id &&
                        "border-2 border-blue-500"
                    )}
                    tabIndex={0}
                    onClick={() => {
                      setSelectedImage(file);
                    }}
                  />
                  {selectedImage?.id === file.id && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                      Ausgewählt
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <Button
            disabled={!selectedImage}
            onClick={() =>
              saveSettings.newsPaper.checked
                ? setFinishStep(3)
                : setFinishStep(4)
            }
          >
            Weiter
          </Button>
        </div>
      )}
      {finishStep === 3 && (
        <div>
          <h1 className="text-2xl font-semibold">
            Bilder für den Zeitungsartikel wählen
          </h1>
          <p className="text-muted-foreground mb-6">
            Bitte wähle zwei Bilder für den Zeitungsartikel aus. Diese werden in
            das Südpfalzkurier-CMS hochgeladen.
          </p>
          {imageData.files.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {imageData.files.map((file) => (
                <div className=" relative">
                  <img
                    key={file.id}
                    src={file.preview}
                    alt={file.file.name}
                    className={cn(
                      "mb-4 rounded-lg size-60 object-cover",
                      newsPaperImages.some((img) => img.id === file.id) &&
                        "border-2 border-blue-500"
                    )}
                    tabIndex={0}
                    onClick={() => {
                      setNewsPaperImages((prev) => {
                        if (prev.some((img) => img.id === file.id)) {
                          return prev.filter((img) => img.id !== file.id);
                        }
                        if (prev.length < 2) {
                          return [...prev, file];
                        }
                        return prev;
                      });
                    }}
                  />
                  {newsPaperImages.some((img) => img.id === file.id) && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                      Ausgewählt
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <Button
            disabled={
              newsPaperImages.length < Math.min(2, newsPaperImages.length)
            }
            onClick={() => setFinishStep(4)}
          >
            Weiter
          </Button>
        </div>
      )}
      {finishStep === 4 && (
        <div className="flex flex-col items-center">
          {isLoading && (
            <>
              <Loader2 className="animate-spin" />
              {uploadProgress.article < 100 && (
                <p className="text-muted-foreground">
                  Artikel wird hochgeladen ({uploadProgress.article} /{" "}
                  {imageData.files.length})
                </p>
              )}
              {uploadProgress.article === 100 && (
                <p className="text-green-500">
                  Artikel erfolgreich hochgeladen!
                </p>
              )}
              {uploadProgress.newspaperArticle === 100 && (
                <p className="text-green-500">
                  Zeitungsartikel erfolgreich hochgeladen!
                </p>
              )}
              {uploadProgress.newspaperArticle < 100 && (
                <p className="text-muted-foreground">
                  Zeitungsartikel wird hochgeladen (
                  {uploadProgress.newspaperArticle}%)
                </p>
              )}
            </>
          )}
          {!isLoading && (
            <>
              <p>Artikel erfolgreich hochgeladen!</p>
              <Button
                onClick={() => (window.location.href = "/aktuelles")}
                className="mt-8"
              >
                Fertig
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const ZodIssueWarning = ({ validatedData }) => {
  return (
    <div className="flex gap-3 items-center text-red-700 mb-4 bg-red-50 p-4 rounded-lg max-w-xs">
      <OctagonAlert />
      <div>
        {validatedData?.error?.issues?.map((issue) => (
          <div>{issue?.message}</div>
        ))}
      </div>
    </div>
  );
};
