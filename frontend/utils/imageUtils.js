import ReactDOMServer from "react-dom/server";

export function exportSvgToPng(svgComponent, width, height, fileName) {
  // Render the SVG component to a string
  const svgString = ReactDOMServer.renderToStaticMarkup(svgComponent);
  // Create a new canvas element
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  var img = document.createElement("img");

  img.setAttribute(
    "src",
    "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)))
  );

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.png`;
    link.click();
    URL.revokeObjectURL(url);
  };
}
