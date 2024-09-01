export const removeNewLine = (input) => {
  if (typeof input !== "string") return "";
  return input.replace(NEWLINE, "");
};

export const NEWLINE = /\n/g;
