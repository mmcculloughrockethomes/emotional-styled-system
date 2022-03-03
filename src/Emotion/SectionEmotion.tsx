/** @jsxImportSource @emotion/react */
import { Box } from "./components";
import { css } from "@emotion/react";
import { getThemeCSSVars } from "./system";

// import TestingSystem from "./TestingSystem";

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
        showBoxTitle="asdfasdf"
        mt={1}
        pl="423px" // theme value/mapped |
        // mx={1}
        myTitle="Wuuuut ya I tink that is cool"
        color="sprk.black"
        sx={{
          paddingLeft: "432px",
          // borderWidth: "8px",
        }}
        onClick={() => {
          console.log("oh ya");
        }}
        matIsCool="ohboyyes"
        className="shit-ya"
        id="box-1"
      >
        <p>Hey, this is the first box!</p>
      </Box>
      <Box
        mb="9"
        showBoxTitle="asdfasdf"
        mt="12"
        pl="4"
        mx="4"
        onClick={() => {
          console.log("oh ya");
        }}
        matIsCool="ohboyyes"
        className="shit-ya"
        id="box-1"
      >
        <p>Hey, this is the second box!</p>
      </Box>
    </div>
  );
}

export default SectionEmotion;
