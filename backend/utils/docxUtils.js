const { writeFileSync, existsSync, mkdirSync } = require("fs");
const { Document, Packer, Paragraph, TextRun, ImageRun } = require("docx");
const { default: slugify } = require("slugify");
const { v4: uuid } = require("uuid");

const DOCUMENT_PX_WIDTH = 575;

const getArticleDocx = async (title, text, images) => {
  const transformedImages = images.map((image) => {
    const { width, height } = image.dimensions;
    const aspectRatio = width / height;
    const newWidth = DOCUMENT_PX_WIDTH;
    const newHeight = Math.round(newWidth / aspectRatio);
    return {
      ...image,
      dimensions: { width: newWidth, height: newHeight },
    };
  });

  const doc = new Document({
    sections: [
      {
        children: [
          ...transformedImages.map(
            (image) =>
              new Paragraph({
                children: [
                  new ImageRun({
                    data: image.buffer,
                    transformation: image.dimensions,
                    type: image.type || "png",
                  }),
                ],
              })
          ),
          new Paragraph({
            children: [new TextRun(text), new TextRun("\n\n")],
          }),
        ],
      },
    ],
  });

  const docBuffer = await Packer.toBuffer(doc);
  const fileName =
    slugify(title.substring(0, 100)).toLowerCase() + "_" + uuid() + ".docx";
  const filePath = "public/uploads/documents/" + fileName;
  if (!existsSync("public/documents")) {
    mkdirSync("public/documents", { recursive: true });
  }
  writeFileSync(filePath, new Uint8Array(docBuffer));
  console.log(`Document ${fileName} created successfully!`);
  return filePath;
};

const getImageBufferFromUrl = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from ${url}`);
  }
  return await response.arrayBuffer();
};

module.exports = { getArticleDocx, getImageBufferFromUrl };
