export const removeNewLine = (input) => {
  if (typeof input !== "string") return "";
  return input.replace(NEWLINE, "");
};

export const NEWLINE = /\n/g;

export function removeHtmlTags(str) {
  if (!str) return;
  // Define the regex pattern to match HTML tags
  const pattern = /<.*?>/g;

  // Use the replace() method to remove all HTML tags
  const cleanedString = str.replace(pattern, "");

  return cleanedString;
}
