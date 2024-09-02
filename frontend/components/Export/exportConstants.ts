import { base64LGCLight } from "../../utils/fontUtils";
import { base64LGCRegular } from "../../utils/fontUtils";

const STYLES_TITLE = `
  .title { 
    font-size: 96px; 
    font-weight: regular; 
    letter-spacing: calc(1rem * 0.075); 
    font-family: LGC; 
    font-weight: 500; 
  }`;

const STYLES_SUBTITLE = `
  .subTitle { 
    font-size: 48px;
    font-weight: regular;
    letter-spacing: calc(1rem * 0.075);
    font-family: LGC; 
    font-weight: 300;
  }`;

const STYLES_FONTS = `
  @font-face {
    font-family: "LGC";
    src: url("${base64LGCLight}") format("truetype");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "LGC";
    src: url("${base64LGCRegular}") format("truetype");
    font-weight: 500;
    font-style: normal;
  }`;

const STYLES_TEXT = `
  .text {
    font-size: 48px;
    font-weight: 300;
    font-family: LGC;
  }`;

const STYLES_TEXT_SMALL = `
  .text-small {
    font-size: 32px;
    font-weight: 300;
    font-family: LGC;
  }`;

const STYLES_TEXT_SMALL_ACCENT = `
  .text-small-accent {
    font-size: 32px;
    font-weight: 500;
    font-family: LGC;
    letter-spacing: 2px;
  }`;

export const COLORS = {
  BG: "#2a6083",
  TEXT: "white",
};

export const GENERAL_STYLES = [
  STYLES_TITLE,
  STYLES_SUBTITLE,
  STYLES_FONTS,
  STYLES_TEXT,
  STYLES_TEXT_SMALL,
  STYLES_TEXT_SMALL_ACCENT,
].join("");

export const SCREEN_WIDTH = 1080;

export const BASE_Y_OFFSET = 380;
