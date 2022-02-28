import React from "react";
import { ThemeProvider } from "@emotion/react";

import theme from "./theme";

import SectionEmotion from "./SectionEmotion";

function Emotion() {
  return (
    <ThemeProvider theme={theme}>
      <SectionEmotion />
    </ThemeProvider>
  );
}

export default Emotion;
