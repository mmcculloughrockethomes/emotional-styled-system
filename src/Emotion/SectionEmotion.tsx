/** @jsxImportSource @emotion/react */

import { Box } from "./components";
import { css } from "@emotion/react";
import { getThemeCSSVars, getResponsiveThemeValues } from "./system";
import facepaint from "facepaint";
// import TestingSystem from "./TestingSystem";

function TestYourFace() {
  const mq = facepaint([
    "@media(min-width: 420px)",
    "@media(min-width: 920px)",
    "@media(min-width: 1120px)",
  ]);

  const myClassName = css(
    mq({
      color: ["red", "green", "blue", "darkorchid"],
    })
  );

  return (
    <div
      id="test-face"
      css={css(
        mq({
          backgroundColor: ["#ff7070", "#707bff", "#efff70", "#70ffff"],
        })
      )}
    >
      <h1>Hello! This is testing face.</h1>
      <p>
        oih oih oiwert wert wert wert wert ewrt wergsersv erzoih oih oiwert wert
        wert wert wert ewrt wergsersv erzoih oih oiwert wert wert wert wert ewrt
        wergsersv erzoih oih oiwert wert wert wert wert ewrt wergsersv erz
      </p>
    </div>
  );
}
function SectionEmotion() {
  // TODO - this shold be a helper, and on a higher-level component
  const varArray = getThemeCSSVars();
  let cssVariables = "";
  for (let i in varArray) {
    cssVariables += varArray[i];
  }

  const result = getResponsiveThemeValues("mb", ["4", "8", "12", "16"]);

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
        mt="8"
        pl="4"
        mx="4"
        myTitle="Wuuuut ya I tink that is cool"
        color="sprk.black"
        // color={["sprk.red", "sprk.purple", "sprk.green", "sprk.yellow"]}
        sx={{
          borderColor: "pink",
          borderWidth: "8px",
        }}
        onClick={() => {
          console.log("oh ya");
        }}
        matIsCool="ohboyyes"
        className="shit-ya"
        id="box-1"
      >
        <h2>
          Hey, this is the first box! Let's change the color responsively.
        </h2>
      </Box>
      {/* <Box
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
        id="box-2"
      >
        <p>Hey, this is the second box!</p>
      </Box> */}
      <TestYourFace />
    </div>
  );
}

export default SectionEmotion;
