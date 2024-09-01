import { Button, Text } from "@react-email/components";
import * as React from "react";

export const EmailButton = ({ children, href, style = {} }) => (
  <Button
    style={{
      fontSize: "16px",
      fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
      ...style,
      backgroundColor: "#5e7bad",
      color: "white",
      padding: "0.75em 1em",
      textDecoration: "none",
      borderRadius: "0.5em",
      minWidth: "200px",
      textAlign: "center",
      fontWeight: "600",
      cursor: "pointer",
    }}
  >
    {children}
  </Button>
);
