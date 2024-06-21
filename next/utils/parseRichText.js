import React from "react";

export function parse(json, prevType, level) {
  console.log(json);
  return json.map((element, index) => {
    const newLevel = level ? level + 1 : 1;
    if (element.type === "heading") {
      const children = parse(element.children, "heading", newLevel);
      return React.createElement(
        `h${element.level}`,
        { key: `${newLevel}_${index}` },
        children
      );
    } else if (element.type === "list") {
      const children = parse(element.children, "list", newLevel);
      const ListComponent = element.format === "unordered" ? "ul" : "ol";
      return React.createElement(
        ListComponent,
        { key: `${newLevel}_${index}` },
        children
      );
    } else if (element.type === "image") {
      return (
        <img key={`${newLevel}_${index}`} src={element.image.url} alt="Bild" />
      );
    } else if (
      element.type === "paragraph" ||
      element.type === "quote" ||
      element.type === "code"
    ) {
      const children = parse(element.children, "paragraph", newLevel);
      return <p key={`${newLevel}_${index}`}>{children}</p>;
    } else if (element.type === "text") {
      const content = (
        <>
          {element.bold && <b>{element.text}</b>}
          {element.italic && <i>{element.text}</i>}
          {!element.bold && !element.italic && element.text}
        </>
      );
      if (element.text === "") {
        return <br />;
      }
      if (prevType) {
        return <>{content}</>;
      }
      return <p key={`${newLevel}_${index}`}>{content}</p>;
    } else if (element.type === "link") {
      const children = parse(element.children, "link", newLevel);
      return (
        <a key={`${newLevel}_${index}`} href={element.url}>
          {children}
        </a>
      );
    } else if (element.type === "list-item") {
      const children = parse(element.children, "list-item", newLevel);
      return <li key={`${newLevel}_${index}`}>{children}</li>;
    }
    return null; // handle unsupported types or return an empty element
  });
}
