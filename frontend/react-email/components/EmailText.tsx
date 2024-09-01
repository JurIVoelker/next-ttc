import { Text } from "@react-email/components";
import * as React from "react";

export const EmailText = ({ children, style = {} }) => (
  <Text
    style={{
      fontSize: "16px",
      fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
      margin: "0.25em 0",
      ...style,
    }}
  >
    {children}
  </Text>
);
