/** @jsxImportSource @emotion/react */
import { Box } from "./components";
import { css } from "@emotion/react";
import { getThemeCSSVars } from "./system";

import TestingSystem from "./TestingSystem";

function SectionEmotion() {
  const varArray = getThemeCSSVars();
  let cssVariables = "";
  for (let i in varArray) {
    cssVariables += varArray[i];
  }
  return (
    <div
      css={css`
        ${cssVariables}
      `}
    >
      <h2>Sweet Emotion</h2>
      <Box
        mb="9"
        showBoxTitle={true}
        mt="8"
        pl="12"
        myTitle="Wuuuut ya I tink that is cool"
        color="sprk.black"
        onClick={() => {
          console.log("oh ya");
        }}
      >
        <p>Hey, this is the first box!</p>
      </Box>
      <TestingSystem />
    </div>
  );
}

export default SectionEmotion;
