import { readFileSync, writeFileSync } from "fs";
import { Document, Packer, Paragraph, TextRun, Media, ImageRun } from "docx";

const getArtileDocx = () => {
  // const image1 = readFileSync("public/images/ttc-logo.png");

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun(
                "This is a simple Word document with two or one images."
              ),
              new TextRun("\n\n"),
            ],
          }),
          new Paragraph({
            children: [
              new ImageRun({
                data: readFileSync("public/test.png"),
                transformation: { width: 100, height: 100 },
                type: "png",
              }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    writeFileSync("output.docx", new Uint8Array(buffer));
    console.log("Document created successfully!");
  });
};

getArtileDocx();
