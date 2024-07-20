import { Heading, Text } from "@react-email/components";
import * as React from "react";

export const EmailH1 = ({ children, style = {} }) => (
  <Heading
    as="h1"
    style={{
      fontSize: "24px",
      fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
      letterSpacing: "-0.03em",
      fontWeight: "700px",
      ...style,
    }}
  >
    {children}
  </Heading>
);
