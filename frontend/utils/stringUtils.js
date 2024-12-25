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

export const reverseDate = (text) => {
  if (typeof text !== "string") return text;
  const array = text.split("-");
  if (array.length !== 3) return text;
  return `${array[2]}.${array[1]}.${array[0]}`;
};

export const getTeamLink = (data) => {
  const prefix =
    process.env.MY_TISCHTENNIS_SPIELERBILANZEN_PREFIX_LINK ||
    "/TTC-Klingenmuenster/spielerbilanzen/";
  const splitLink = data.link.split("/");
  const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
  const suffix = currentMonth >= 8 && currentMonth <= 12 ? "/vr" : "/rr";
  return splitLink.splice(0, splitLink.length - 4).join("/") + prefix + suffix;
};
