import Link from "next/link";

export const replaceAnchorTagsWithLink = (text) => {
  // Regular expression to match all anchor tags
  const regex = /<a href="(.*?)">(.*?)<\/a>/g;

  // Initialize an array to hold the result
  const result = [];
  let lastIndex = 0;

  // Use the replace method to find all matches and build the output array
  text.replace(regex, (match, href, textContent, index) => {
    // Push the text before the match
    result.push(text.substring(lastIndex, index));

    // Push the Link component for the match
    result.push(
      <Link key={index} href={href}>
        {textContent}
      </Link>
    );

    // Update the last index to the end of the current match
    lastIndex = index + match.length;
  });

  // Push the remaining text after the last match
  result.push(text.substring(lastIndex));

  return result;
};
